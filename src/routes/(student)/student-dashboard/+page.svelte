<script lang="ts">
	import { BellRing } from 'lucide-svelte';
	import { fromStudentRouteState } from '../_states/fromStudentRoute.svelte';

	const route = fromStudentRouteState();
	route.setRoute('/student-dashboard');
</script>

<div class="min-h-screen">
	<div class="bg-slate-100 p-[0.625rem] md:p-[1.25rem]">
		<div class="flex flex-wrap items-center gap-[20px] bg-[#89CFF0] p-[10px] md:flex-nowrap">
			<BellRing class="h-full w-[60px] bg-[#89CFF0] p-[10px] text-black" />
			<div class="text-black">
				<p class="font-semibold leading-7">Reminder</p>
				<p class="text-sm leading-7">
					You are evaluating your SUBJECT TEACHER, please read the directions before you begin the
					evaluation process. If teachers where wrongly included in the please, please let us know.
					Message us at blabla@gmail.com
				</p>
			</div>
		</div>
	</div>

	<div class="">
		<div class="flex items-center gap-[20px] bg-slate-100 p-[10px]">
			<p class="">
				Below are the subjects and faculty members that you need to evaluate. click the evaluate
				button to start
			</p>
		</div>

		<div
			class="sticky top-[3rem] hidden border-t-[1px] border-slate-400 bg-slate-100 md:grid md:grid-cols-[5%,25%,25%,25%,20%] lg:grid-cols-[5%,40%,30%,15%,10%]"
		>
			<span
				class="flex items-center justify-center border-r-[1px] border-slate-400 p-[10px] text-sm font-semibold"
				>#</span
			>
			<span class="border-r-[1px] border-slate-400 p-[10px] text-sm font-semibold">TEACHER</span>
			<span class="border-r-[1px] border-slate-400 p-[10px] text-sm font-semibold">SUBJECT</span>
			<span class="border-r-[1px] border-slate-400 p-[10px] text-sm font-semibold">STATUS</span>
			<span class="p-[10px] text-sm font-semibold">ACTIONS</span>
		</div>

		<!--Looping table here-->
		<div class="mt-[2dvh] flex flex-col gap-[10px] md:mt-0 md:gap-0">
			{#each Array(40) as _, index}
				<div
					class="hidden border-t-[1px] border-slate-400 bg-slate-300 md:grid md:grid-cols-[5%,25%,25%,25%,20%] lg:grid-cols-[5%,40%,30%,15%,10%]"
				>
					<span
						class="flex items-center justify-center border-r-[1px] border-slate-400 p-[10px] text-sm font-semibold"
						>{index + 1}</span
					>
					<span
						class="flex items-center border-r-[1px] border-slate-400 p-[10px] text-sm font-semibold"
						>Faculty Test {index + 1}</span
					>
					<span
						class="flex items-center border-r-[1px] border-slate-400 p-[10px] text-sm font-semibold"
						>COMSCI 1110</span
					>
					<span
						class="flex items-center border-r-[1px] border-slate-400 p-[10px] text-sm font-semibold"
					>
						<div class="flex max-w-fit items-center bg-orange-500 p-[10px] text-xs text-white">
							NOT STARTED
						</div>
					</span>
					<span class="flex items-center p-[10px] text-sm font-semibold">
						<button class="flex max-w-fit items-center bg-green-500 p-[10px] text-xs text-white">
							EVALUATE
						</button>
					</span>
				</div>

				<!--Render for mobile view-->
				<div class="md:hidden">
					<div class="relative flex flex-col gap-[20px] bg-slate-300 p-[10px]">
						<p>#: {index + 1}</p>

						<div
							class="absolute right-0 top-0 m-[10px] flex max-w-fit items-center bg-orange-500 p-[10px] text-xs text-white"
						>
							NOT STARTED
						</div>

						<p>Teacher: Faculty Text {index + 1}</p>
						<p>Subject: COMSCI 1110</p>

						<button class="bg-green-500 p-[10px] text-xs font-semibold text-white"
							>Evaluate Now</button
						>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
