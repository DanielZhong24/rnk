<script lang="ts">
import { experienceTimeline } from '$lib/config/pages';
import type { ExperienceTimelineItem } from '$lib/config/pages';

function fmt(dateStr?: string) {
	if (!dateStr) return 'Present';
	// keep it robust for already-formatted strings
	try {
		const d = new Date(dateStr);
		if (isNaN(d.getTime())) return dateStr;
		return d.toLocaleString('en-US', { month: 'short', year: 'numeric' });
	} catch (e) {
		return dateStr;
	}
}
</script>


<section class="px-4 md:px-0">
	<div class="border-surface0 bg-base space-y-5 rounded-xl border p-4 shadow-lg md:p-6">
		<h2 class="text-text text-sm font-semibold">Experience</h2>
		<div class="mt-4 space-y-6">
			{#each experienceTimeline as item (item.company + item.role)}
				<div class="flex items-start space-x-4">
					<div class="flex flex-col items-center">
						<div class="w-12 h-12 rounded-full overflow-hidden bg-surface1 flex items-center justify-center">
							{#if item.logoUrl}
								<img src={item.logoUrl} alt={item.logoAlt} class="object-contain" style="width:48px;height:48px;transform:scale({item.logoScale ?? 1});" />
							{:else}
								<div class="text-sm text-subtext1">{item.company[0]}</div>
							{/if}
						</div>
						<div class="w-px bg-surface2 h-full mt-2"></div>
					</div>

					<div class="flex-1">
						<a href={item.url} target="_blank" rel="noopener noreferrer" class="text-text font-medium hover:underline">{item.role} <span class="text-subtext1">— {item.company}</span></a>
						<div class="text-subtext0 text-xs mt-1">{fmt(item.startDate)} — {item.endDate ? fmt(item.endDate) : 'Present'}</div>
						{#if item.details}
							<p class="text-subtext0 mt-2 text-sm">{item.details}</p>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
