<script lang="ts">
	import { mainNavItems } from '$lib/config/navItems';
	import { IconX } from '@tabler/icons-svelte';
	import { page } from '$app/state';

	let { isOpen, closeSidebar } = $props<{ isOpen: boolean; closeSidebar: () => void }>();

	let currentPath = $derived(page.url.pathname);
</script>

{#if isOpen}
	<div
		class="fixed inset-0 z-30 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
		onclick={closeSidebar}
		onkeydown={(e) => e.key === 'Escape' && closeSidebar()}
		role="button"
		tabindex="-1"
		aria-label="Close sidebar"
	></div>
{/if}

<aside
	class={`bg-mantle text-text border-surface0 fixed inset-y-0 right-0 z-40 flex w-64 transform flex-col border-l shadow-xl transition-transform duration-300 ease-in-out ${
		isOpen ? 'translate-x-0' : 'translate-x-full'
	}`}
	id="sidebar-nav"
>
	<div class="border-surface0 flex h-16 shrink-0 items-center justify-between border-b p-4">
		<span class="text-accent font-mono text-lg font-semibold">Navigation</span>
		<button
			onclick={closeSidebar}
			class="text-subtext1 hover:text-red rounded"
			aria-label="Close navigation menu"
		>
			<IconX size={24} />
		</button>
	</div>

	<nav class="flex-1 overflow-y-auto p-4">
		<ul class="space-y-2" role="list">
			{#each mainNavItems as item (item.title)}
				{@const isActive = !item.external && currentPath === item.href}
				<li>
					<a
						href={item.href}
						target={item.external ? '_blank' : undefined}
						rel={item.external ? 'noopener noreferrer' : undefined}
						class="hover:bg-surface0 focus:bg-surface1 block rounded p-2 transition-colors duration-150 focus:outline-none"
						aria-current={isActive ? 'page' : undefined}
						onclick={closeSidebar}
					>
						{item.title}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</aside>
