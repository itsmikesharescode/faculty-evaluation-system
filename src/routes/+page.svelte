<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { fade, fly } from 'svelte/transition';
	import fes_icon from '../assets/fes_icon.png?enhanced';
	import { X } from 'lucide-svelte';

	let loginModal = $state(false);
</script>

<!--BOUND NAV-->
<nav class="sticky top-0 flex w-full items-center justify-between p-[10px] backdrop-blur-sm">
	<p class="font-semibold">OCC</p>
	<div class="flex items-center gap-[10px]">
		<button>Manual</button>
		<Button size="sm" class="rounded-none text-sm font-semibold" onclick={() => (loginModal = true)}
			>Log in</Button
		>
	</div>
</nav>
<div class="flex h-[50dvh] flex-col items-center justify-center bg-green-500">
	<div class="flex flex-col items-center justify-center gap-[10px]">
		<enhanced:img src={fes_icon} class="h-[150px] w-[150px]" alt="landing_icon"></enhanced:img>
		<p class="text-center text-3xl">Faculty <strong>Evaluation</strong> System</p>
		<Button class="rounded-none font-semibold">EVALUATE NOW</Button>
	</div>
</div>
<div class="h-[70px] w-full rounded-b-[100%] bg-green-500"></div>

<div class="mt-[30px] flex flex-col gap-[20px] p-[20px] md:flex-row md:justify-center">
	<div class="rounded-lg shadow-lg">
		<p class="rounded-t-sm bg-green-500 p-[10px] text-center font-semibold">PEER EVALUATION</p>
		<div class="p-[20px]">
			<p class="text-center leading-7">Faculty members evaluate their peers/colleagues.</p>
		</div>
	</div>

	<div class="rounded-lg shadow-lg">
		<p class="rounded-t-sm bg-green-500 p-[10px] text-center font-semibold">PEER EVALUATION</p>
		<div class="p-[20px]">
			<p class="text-center leading-7">Faculty members evaluate their peers/colleagues.</p>
		</div>
	</div>
</div>

<!--Login modal-->
{#if loginModal}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed bottom-0 left-0 right-0 top-0 bg-[#00000050] p-[10px]"
		onclick={() => (loginModal = false)}
	>
		<div
			class="relative mx-auto max-w-[500px] rounded-sm bg-white p-[10px]"
			transition:fly={{ y: -200, duration: 350 }}
			onclick={(e) => e.stopPropagation()}
		>
			<button
				onclick={() => (loginModal = false)}
				class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
			>
				<X />
				<span class="sr-only">Close</span>
			</button>
			<p class="text-base font-semibold leading-7">Log in as</p>

			<div class="mt-[20px] flex flex-col gap-[10px]">
				<Button>Student</Button>
				<Button disabled>Faculty Member</Button>
				<Button disabled>Supervisor</Button>
			</div>
		</div>
	</div>
{/if}
