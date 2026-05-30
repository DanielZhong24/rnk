import Site from '$lib/config/common';
import { env } from '$env/dynamic/private';
import type { LayoutServerLoad } from './$types';
import { measurePerformance } from '$lib/utils/performance';

export const load: LayoutServerLoad = async () => {
	const { instance, namespace, key } = Site.abacus;
	const deploymentCommitSha =
		env.RAILWAY_GIT_COMMIT_SHA ?? env.GITHUB_SHA ?? env.CI_COMMIT_SHA ?? env.PUBLIC_COMMIT_SHA;
	let footerData;
	try {
		footerData = await measurePerformance('abacus-api-fetch', async () => {
			const response = await fetch(`${instance}/hit/${namespace}/${key}`, {
				signal: AbortSignal.timeout(600) // 600ms timeout
			});
			return response.json();
		});
		footerData.value = footerData.value.toLocaleString();
	} catch (error) {
		console.error('Error fetching footer data:', error);
		return {
			footerData: {
				value: 'infinite',
				commitSha: deploymentCommitSha
			}
		};
	}
	return {
		footerData: {
			...footerData,
			commitSha: deploymentCommitSha
		}
	};
};
