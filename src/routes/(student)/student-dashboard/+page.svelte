<script lang="ts">
	import { BellRing } from 'lucide-svelte';
</script>

<div class="min-h-screen">
	<div class="md:p-[1.25rem]] bg-slate-100 p-[0.625rem]">
		<div class="flex items-center gap-[20px] bg-green-500 p-[10px]">
			<BellRing class="h-full w-[60px] bg-[#89CFF0] p-[10px] text-white" />
			<div class="text-white">
				<p class="font-semibold leading-7">Reminder</p>
				<p class="text-sm leading-7">
					You are evaluating your SUBJECT TEACHER, please read the directions before you begin the
					evaluation process. If teachers where wrongly included in the please, please let us know.
					Message us at blabla@gmail.com
				</p>
			</div>
		</div>
	</div>

	<div class="md:p-[1.25rem]] p-[0.625rem]">
		<div class="flex items-center gap-[20px] bg-slate-100 p-[10px]">
			<p class="text-green-700">
				Below are the subjects and faculty members that you need to evaluate. click the evaluate
				button to start
			</p>
		</div>

		<div class="grid grid-cols-[5%,40%,30%,15%,10%] border-t-[1px] border-slate-400 bg-slate-100">
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
		{#each Array(30) as _, index}
			<div class="grid grid-cols-[5%,40%,30%,15%,10%] border-t-[1px] border-slate-400 bg-slate-300">
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
					<div class="flex max-w-fit items-center bg-green-500 p-[10px] text-xs text-white">
						EVALUATE
					</div>
				</span>
			</div>
		{/each}
	</div>
</div>
