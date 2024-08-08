<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import fes_icon from '../assets/fes_icon.png?enhanced';
</script>

<!--BOUND NAV-->
<nav class="sticky top-0 flex w-full items-center justify-between p-[10px] backdrop-blur-sm">
	<p class="font-semibold">OCC</p>
	<div class="flex items-center gap-[10px]">
		<button>Manual</button>
		<Button size="sm" class="rounded-none text-sm font-semibold">Log in</Button>
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
