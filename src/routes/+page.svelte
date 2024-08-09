<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { fly } from 'svelte/transition';
	import fes_icon from '$lib/assets/fes_icon.png?enhanced';
	import bg_image from '$lib/assets/bg.webp?enhanced';
	import { X } from 'lucide-svelte';
	import { goto } from '$app/navigation';

	let loginModal = $state(false);
</script>

<!--BOUND NAV-->
<nav class="sticky top-0 z-10 flex w-full items-center justify-between p-[10px] backdrop-blur-sm">
	<p class="font-semibold">OCC</p>
	<div class="flex items-center gap-[10px]">
		<button>Manual</button>
		<Button size="sm" class="rounded-none text-sm font-semibold" onclick={() => (loginModal = true)}
			>Log in</Button
		>
	</div>
</nav>
<div class="relative h-screen w-full">
	<!-- Background Image -->
	<enhanced:img
		src={bg_image}
		alt="bg_image"
		class="absolute inset-0 h-full w-full object-cover grayscale-[60%] filter"
	/>

	<!-- Centered Content -->
	<div class="absolute inset-0 flex flex-col items-center justify-center gap-[10px]">
		<div class="flex flex-col items-center gap-[20px] rounded-lg bg-[#ffffffc0] p-[20px]">
			<enhanced:img src={fes_icon} class="h-[150px] w-[150px]" alt="landing_icon" />
			<p class="text-center text-3xl">
				<strong>ProfEval</strong> System
			</p>
			<Button class="rounded-none font-semibold" onclick={() => (loginModal = true)}>
				EVALUATE NOW
			</Button>
		</div>
	</div>
</div>

<!--Login modal-->
{#if loginModal}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed bottom-0 left-0 right-0 top-0 z-20 bg-[#00000050] p-[10px]"
		onclick={() => (loginModal = false)}
	>
		<div
			class="relative mx-auto max-w-[500px] rounded-sm bg-white p-[10px]"
			in:fly={{ y: -200, duration: 350 }}
			out:fly={{ y: -200, duration: 175 }}
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
				<Button onclick={() => goto('/student-login')}>Student</Button>
				<Button onclick={() => goto('/admin-login')}>Admin</Button>
			</div>
		</div>
	</div>
{/if}
