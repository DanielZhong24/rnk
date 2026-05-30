import type { PageServerLoad } from './$types';
import { getFeaturedProjects } from '$lib/content/projects';
import { fetchLatestCommits } from '$lib/api/commits';
import { measurePerformance } from '$lib/utils/performance';

export const load: PageServerLoad = async (event) => {
	const kv = event.platform?.env?.NYXCACHE;

	return await measurePerformance('homepage-load-total', async () => {
		const [featuredProjects, commitData] = await Promise.all([
			measurePerformance('get-featured-projects', () => getFeaturedProjects()),
			fetchLatestCommits(kv)
		]);

		return {
			featuredProjects,
			commitData
		};
	});
};
