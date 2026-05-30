<script lang="ts">
	import LinkWithIcon from '$components/LinkWithIcon.svelte';
	import Featured, { type FeaturedProject } from '$components/layout/Featured.svelte';
	import { IconExternalLink, IconActivity } from '@tabler/icons-svelte';
	import { Home } from '$lib/config/pages';
	import Experience from '$components/Experience.svelte';
	import LocationMap from '$components/bento/LocationMap.svelte';
	import IBMBob from '$lib/icons/IBMBob.svelte';
	import type { CommitData } from '$lib/api/commits';

	type PageData = {
		featuredProjects: FeaturedProject[];
		commitData: CommitData;
	};

	let { data }: { data: PageData } = $props();
	const langTotal = $derived((data.commitData?.languages || []).reduce((a, l) => a + l.size, 0));
</script>

<div class="mx-auto max-w-6xl space-y-12 px-0 py-8 md:space-y-16 md:px-4 md:py-12">
	<section class="space-y-5 px-4 md:px-0">
		<h1 class="text-3xl font-bold md:text-4xl">HEY!!!! I'm <span class="text-accent">Daniel Zhong</span></h1>
		<p class="text-subtext0 max-w-prose text-lg leading-relaxed">
			I'm currently interning as a software developer @<span class="text-blue text-2xl">IBM</span>. 
			I've been working on <a href="https://bob.ibm.com/" class="link text-shadow-blue">IBM Bob</a>.
			I'm also a 2nd year student @<span class="text-red text-2xl">YorkU</span> studying computer science.
			I love building products that people use and that is what motivates me. 
		</p>

		<div class="self-center">
			<span>Say hi to Bob</span><IBMBob class="mb-100"width="100" height="80" />
		</div>
		<div class="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2">
			{#each Home.socialLinks as link (link.href)}
				<LinkWithIcon
					href={link.href}
					text={link.text}
					icon={link.icon}
					external={true}
					class="text-sm"
				/>
				{#if link !== Home.socialLinks[Home.socialLinks.length - 1]}
					<span class="text-surface1 text-xs">|</span>
				{/if}
			{/each}
		</div>
	</section>

	<Experience />

	<Featured projects={data.featuredProjects} maxProjects={3} />

	<section class="px-4 md:px-0">
		<h2 class="sr-only">Dashboard / Highlights</h2>
		<div class="grid grid-cols-1 justify-center gap-5 md:gap-6 lg:grid-cols-4">
			<LocationMap />

			<div class="border-surface0 bg-base rounded-xl border p-4 shadow-lg lg:col-span-3">
				<div class="text-text mb-3 flex items-center justify-between gap-2 text-sm">
					<h3 class="flex items-center gap-2 font-semibold">
						<IconActivity size={16} class="text-accent" />
						<span>Recent Commits</span>
					</h3>
					<a
						href="https://katib.jsn.cam"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="See how this is calculated Katib"
						class="text-accent/80 hover:text-accent text-xs font-medium transition-colors"
					>
						[info]
					</a>
				</div>

				{#if data.commitData?.commits?.length > 0}
					<ul class="space-y-1.5 text-sm">
						{#each data.commitData.commits.slice(0, 4) as commit (commit.sha)}
							<li>
								<a
									href={commit.href}
									target="_blank"
									rel="noopener noreferrer"
									class="text-subtext0 hover:text-accent flex min-w-0 items-center gap-2"
									title={`${commit.repo}: ${commit.message}`}
								>
									<span class="text-text shrink-0 font-medium">{commit.repo.split('/')[1]}:</span>
									<span class="min-w-0 flex-1 truncate">{commit.message}</span>
									{#if commit.additions !== undefined && commit.deletions !== undefined}
										<span class="shrink-0 text-xs whitespace-nowrap">
											<span class="text-green">+{commit.additions}</span>
											<span class="text-surface1">/</span>
											<span class="text-red">-{commit.deletions}</span>
										</span>
									{/if}
								</a>
							</li>
						{/each}
					</ul>
				{:else}
					<p class="text-subtext1 text-sm italic">No recent public commits.</p>
				{/if}

				<div class="mt-3 flex items-center gap-3">
					<a
						href="https://github.com/DanielZhong24"
						target="_blank"
						rel="noopener noreferrer"
						class="group text-accent inline-flex items-center gap-1 text-sm hover:underline"
					>
						<span>View on GitHub</span>
						<IconExternalLink
							size={14}
							class="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
						/>
					</a>

					{#if langTotal > 0}
						<div
							class="ml-auto max-w-xs flex-1 sm:max-w-sm md:max-w-md"
							aria-label="Language breakdown"
						>
							<div class="bg-surface2 h-2 w-full rounded-[3px]">
								<div class="flex h-full w-full">
									{#each data.commitData.languages as lang (lang.name)}
										<div
											class="group relative h-full first:rounded-l-[3px] last:rounded-r-[3px]"
											style={`width: clamp(8px, ${(lang.size / langTotal) * 100}%, ${(lang.size / langTotal) * 100}%); background-color: ${lang.color};`}
										>
											<div
												class="border-surface1 bg-surface1 pointer-events-none absolute -top-7 left-1/2 z-10 -translate-x-1/2 rounded border px-2 py-0.5 text-xs whitespace-nowrap opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100"
											>
												<span class="inline-flex items-center gap-2">
													<span
														class="inline-block h-2 w-2 rounded"
														style={`background-color: ${lang.color};`}
													></span>
													<span class="text-subtext0">{lang.name}</span>
													<span class="text-surface1">•</span>
													<span class="text-subtext1"
														>{Math.round((lang.size / langTotal) * 100)}%</span
													>
												</span>
											</div>
										</div>
									{/each}
								</div>
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</section>
</div>
