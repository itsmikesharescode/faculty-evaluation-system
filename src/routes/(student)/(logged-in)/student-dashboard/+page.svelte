<script lang="ts">
	import { BellRing, ListChecks, MoveUpRight } from 'lucide-svelte';
	import { fromStudentRouteState } from '../_states/fromStudentRoute.svelte';
	import { fromDashboardRouteState } from '../_states/fromDashboardRoute.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { ProfessorType } from '$lib/types';
	import { goto } from '$app/navigation';

	const route = fromStudentRouteState();
	const dashboardRoute = fromDashboardRouteState();

	route.setRoute('/student-dashboard');
	dashboardRoute.resetAnswer();
	dashboardRoute.setActiveProf(null);

	const handleEvaluate = (p: ProfessorType) => {
		dashboardRoute.setActiveProf(p);
		goto('/student-dashboard/evaluation');
	};
</script>

<div class="min-h-screen border-l-[1px] border-slate-300">
	<div class="bg-slate-100 p-[0.625rem] md:p-[1.25rem]">
		<div class="flex flex-wrap items-center gap-[20px] bg-primary p-[10px] md:flex-nowrap">
			<BellRing class="h-full w-[60px] p-[10px] text-white " />
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

	<div class="p-[0.625rem]">
		<div class="flex items-center gap-[20px] p-[10px]">
			<p class="">
				Below are the subjects and faculty members that you need to evaluate. click the evaluate
				button to start
			</p>
		</div>

		<div
			class="sticky top-[3rem] hidden bg-secondary md:grid md:grid-cols-[50%,25%,25%] lg:grid-cols-[55%,30%,15%]"
		>
			<span class=" p-[10px] text-sm font-semibold">Teacher</span>
			<span class=" p-[10px] text-sm font-semibold">Department</span>
			<span class=" p-[10px] text-sm font-semibold">Status</span>
		</div>

		<!--Looping table here-->
		<div class="mt-[2dvh] flex flex-col gap-[10px] md:mt-0 md:gap-0">
			{#each dashboardRoute.getProfs() ?? [] as professor, index}
				<div
					class="hidden border-b-[1px] md:grid md:grid-cols-[50%,25%,25%] lg:grid-cols-[55%,30%,15%]"
				>
					<span class="flex items-center p-[10px] text-sm">{professor.fullname}</span>
					<span class="flex items-center p-[10px] text-sm">{professor.department}</span>
					<span class="flex items-center p-[10px] text-sm">
						<Button
							size="sm"
							onclick={() => handleEvaluate(professor)}
							class="flex items-center gap-[5px]"
						>
							Evaluate Now
							<ListChecks class="h-[15px] w-[15px]" />
						</Button>
					</span>
				</div>

				<!--Render for mobile view-->
				<div class="md:hidden">
					<div class="relative flex flex-col gap-[20px] bg-slate-300 p-[10px]">
						<p>#: {index + 1}</p>

						<p>Teacher: Faculty Text {index + 1}</p>
						<p>Subject: COMSCI 1110</p>

						<Button
							size="sm"
							onclick={() => handleEvaluate(professor)}
							class="flex items-center gap-[5px]"
						>
							Evaluate Now
							<ListChecks class="h-[15px] w-[15px]" />
						</Button>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
