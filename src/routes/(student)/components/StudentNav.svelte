<script lang="ts">
	import fes_icon from '$lib/assets/fes_icon.png?enhanced';
	import type { Snippet } from 'svelte';
	import { Rocket, CircleUser, LogOut, Menu } from 'lucide-svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { fly } from 'svelte/transition';
	import * as Sheet from '$lib/components/ui/sheet/index.js';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	let showSideBar = $state(false);
	let showMobileMenu = $state(false);

	let nativeWidth = $state(0);
</script>

<svelte:window bind:innerWidth={nativeWidth} />

<div class="relative flex">
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="sticky top-0 z-20 hidden h-[70dvh] md:flex"
		onmouseleave={() => (showSideBar = false)}
		onmouseenter={() => (showSideBar = true)}
	>
		<div class="flex flex-col gap-[20px] p-[10px]">
			<enhanced:img src={fes_icon} alt="nav_icon" class="z-40 mx-auto h-[40px] w-[40px]"
			></enhanced:img>
			<div class="flex flex-col items-center justify-center gap-[10px]">
				<button class="bg-[#89CFF0] p-[10px] text-white">
					<Rocket class="h-[25px] w-[25px]" />
				</button>

				<Separator />

				<button class="p-[10px]">
					<CircleUser class="h-[25px] w-[25px]" />
				</button>

				<Separator />

				<button class=" p-[10px]">
					<LogOut class="h-[25px] w-[25px]" />
				</button>

				<Separator />
			</div>
		</div>

		{#if showSideBar}
			<div
				transition:fly={{ x: -10, duration: 500 }}
				class="absolute z-30 ml-[3.3rem] flex h-screen flex-col gap-[10px] bg-white pr-[10px] pt-[70px]"
			>
				<button class="bg-[#89CFF0] p-[10px] text-left text-white">
					<p class="h-[25px]">Dashboard</p>
				</button>

				<Separator />
				<button class="p-[10px] text-left">
					<p class="h-[25px] truncate">Manage Account</p>
				</button>

				<Separator />

				<button class="p-[10px] text-left">
					<p class="h-[25px]">Logout</p>
				</button>

				<Separator />
			</div>
		{/if}
	</div>
	<div class="w-full">
		<nav
			class="sticky top-0 z-10 flex items-center justify-between border-b-[1px] p-[10px] backdrop-blur-sm"
		>
			<p class="text-sm leading-7"><strong>ProfEval</strong> System</p>

			<div class="hidden items-center gap-[5px] md:flex">
				<p class="text-sm leading-7 text-muted-foreground">Student</p>
				<p class="text-sm leading-7">Eviota, Mike John B.</p>
			</div>

			<button class="md:hidden" onclick={() => (showMobileMenu = true)}>
				<Menu />
			</button>
		</nav>

		<div class="bg-[#89CFF0]">
			{@render children()}
		</div>
	</div>
</div>

<!--Mobile Menu-->
{#if !(nativeWidth >= 768)}
	<Sheet.Root bind:open={showMobileMenu}>
		<Sheet.Content side="left">
			<Sheet.Header class="mt-[5dvh]">
				<Sheet.Title>Eviota, Mike John B</Sheet.Title>
				<Sheet.Description>Student</Sheet.Description>
			</Sheet.Header>
			<div class="grid gap-4 py-4">
				<button class="flex items-center gap-[5px] bg-[#89CFF0] p-[10px] text-white">
					<Rocket class="h-[25px] w-[25px]" />
					<p class="w-full text-center">Dashboard</p>
				</button>

				<Separator />

				<button class="flex items-center gap-[5px] p-[10px]">
					<CircleUser class="h-[25px] w-[25px]" />
					<p class="w-full text-center">Manage Account</p>
				</button>

				<Separator />

				<button class="flex items-center gap-[5px] p-[10px]">
					<LogOut class="h-[25px] w-[25px]" />
					<p class="w-full text-center">Log out</p>
				</button>

				<Separator />
			</div>
			<Sheet.Footer></Sheet.Footer>
		</Sheet.Content>
	</Sheet.Root>
{/if}
