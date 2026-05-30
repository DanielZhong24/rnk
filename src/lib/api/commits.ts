import { measurePerformance } from '$lib/utils/performance';
import { getKV, setKV, isCacheStale } from '$lib/utils/edge-cache';
import { env } from '$env/dynamic/private';
const GITHUB_TOKEN = env.GITHUB_TOKEN as string | undefined;
import type { KVNamespace } from '@cloudflare/workers-types';
export interface CommitLanguage {
	size: number;
	name: string;
	color: string;
}

export interface V2CommitItem {
	repo: string;
	additions: number;
	deletions: number;
	commitUrl: string;
	committedDate: string;
	oid: string;
	messageHeadline: string;
	messageBody: string;
}

export interface KatibV2Response {
	commits: V2CommitItem[];
	languages: CommitLanguage[];
	stats: { totalAdditions: number; totalDeletions: number; totalCommits: number };
}

export interface ProcessedCommit {
	repo: string;
	message: string;
	href: string;
	sha: string;
	date: string;
	additions?: number;
	deletions?: number;
}

export interface CommitData {
	commits: ProcessedCommit[];
	languages: CommitLanguage[];
	totalAdditions: number;
	totalDeletions: number;
	totalCommits: number;
}

const KATIB_USERNAME = 'DanielZhong24';
const KV_KEY = `katib:commits:${KATIB_USERNAME}`;
const TTL_MS = 60 * 60 * 1000; // 1 hour

const EMPTY_RAW: KatibV2Response = {
	commits: [],
	languages: [],
	stats: { totalAdditions: 0, totalDeletions: 0, totalCommits: 0 }
};

function processResponse(data: KatibV2Response): CommitData {
	const commits: ProcessedCommit[] = (data.commits || []).map((c) => ({
		repo: c.repo,
		message: c.messageHeadline,
		href: c.commitUrl,
		sha: c.oid,
		date: c.committedDate,
		additions: c.additions,
		deletions: c.deletions
	}));

	const totalAdditions =
		data.stats?.totalAdditions ?? commits.reduce((acc, c) => acc + (c.additions || 0), 0);
	const totalDeletions =
		data.stats?.totalDeletions ?? commits.reduce((acc, c) => acc + (c.deletions || 0), 0);
	const totalCommits = data.stats?.totalCommits ?? commits.length;

	return {
		commits,
		languages: data.languages || [],
		totalAdditions,
		totalDeletions,
		totalCommits
	};
}

/**
 * Fetches the latest commits from the katib API with KV cache (stale-while-revalidate)
 */
export async function fetchLatestCommits(kv?: KVNamespace): Promise<CommitData> {
	// If KV available, try cache-first approach
	if (kv) {
		const cached = await getKV<CommitData>(kv, KV_KEY);
		if (cached) {
			// Check if stale before refreshing
			if (isCacheStale(cached, TTL_MS)) {
				console.log('[PERF] fetchLatestCommits: Cache stale, refreshing in background');
				void refreshCache(kv);
			} else {
				console.log('[PERF] fetchLatestCommits: Cache fresh, using cached data');
			}
			return cached.data;
		}
	}

	// No KV or no cache - fetch directly
	console.log('[PERF] fetchLatestCommits: NO CACHE - fetching from katib...');
	return await refreshCache(kv);
}

async function refreshCache(kv?: KVNamespace): Promise<CommitData> {
	return await measurePerformance('katib-api-fetch', async () => {
		try {
			const headers: Record<string, string> = {
				Accept: 'application/json',
				'User-Agent': 'nyx-website/1.0'
			};
			if (GITHUB_TOKEN) headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;

			const response = await fetch(
				`https://katib.jasoncameron.dev/v2/commits/latest?username=${KATIB_USERNAME}&limit=5`,
				{
					headers,
					signal: AbortSignal.timeout(2500)
				}
			);

			if (!response.ok) throw new Error(`HTTP ${response.status}`);
			const json: KatibV2Response = await response.json();
			console.log(`[PERF] katib-response-size: ${JSON.stringify(json).length} bytes`);
			const data = processResponse(json);
			if (kv) await setKV(kv, KV_KEY, data);
			return data;
		} catch (err) {
			console.warn('katib fetch failed:', err);
			// Try KV cache if available
			if (kv) {
				const cached = await getKV<CommitData>(kv, KV_KEY);
				if (cached) {
					console.log('Using stale KV cache after fetch failure');
					return cached.data;
				}
			}
			console.log('Using empty commit data after fetch failure');
			return processResponse(EMPTY_RAW);
		}
	});
}
