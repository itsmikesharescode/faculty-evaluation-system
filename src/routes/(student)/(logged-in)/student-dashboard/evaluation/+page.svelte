<script lang="ts">
	import { onMount } from 'svelte';
	import { Progress } from '$lib/components/ui/progress/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import { fromStudentRouteState } from '../../_states/fromStudentRoute.svelte';
	import { fromDashboardRouteState } from '../../_states/fromDashboardRoute.svelte';
	import CustomRadioGroup from './_component/CustomRadioGroup.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { goto } from '$app/navigation';
	import { Activity } from 'lucide-svelte';

	const route = fromStudentRouteState();
	const dashboardRoute = fromDashboardRouteState();

	route.setRoute('/student-dashboard');

	let clientCheck = $state(true);

	const percentage = $derived.by(() => {
		let totalQuestions = [];
		const totalAnswer = dashboardRoute.getAnswers().length;

		dashboardRoute.getEvals()?.forEach((item) => {
			item.evaluation_data.forEach((innerItem) => {
				innerItem.questions.forEach((sinnerItem) => {
					totalQuestions.push(sinnerItem);
				});
			});
		});

		return (totalAnswer / (totalQuestions.length ?? 1)) * 100;
	});
	onMount(() => {
		if (!dashboardRoute.getActiveProf()) return goto('/student-dashboard');
		clientCheck = false;
	});

	const handleSubmit = async () => {
		//to calculate the percentage (sum of score / sum of highest score ) * 100
	};
</script>

{#if clientCheck}
	<div
		class="flex min-h-screen flex-col items-center justify-center gap-[1.25rem] border-l-[1px] border-slate-300 text-muted-foreground"
	>
		<Activity class="h-[3rem] w-[3rem]" />
		<p class="">Checking Process ...</p>
	</div>
{:else}
	<div class="min-h-screen border-l-[1px] border-slate-300 p-[10px]">
		<Breadcrumb.Root>
			<Breadcrumb.List>
				<Breadcrumb.Item>
					<Breadcrumb.Link href="/student-dashboard">Dashboard</Breadcrumb.Link>
				</Breadcrumb.Item>
				<Breadcrumb.Separator />
				<Breadcrumb.Item>
					<Breadcrumb.Page>Evaluating {dashboardRoute.getActiveProf()?.fullname}</Breadcrumb.Page>
				</Breadcrumb.Item>
			</Breadcrumb.List>
		</Breadcrumb.Root>

		<div class="flex flex-col gap-[10px] bg-white p-[20px]">
			<div class="sticky top-[3.3rem] flex items-center justify-center">
				<Progress value={percentage ?? 0} max={100} class="h-[20px] w-full rounded-none" />
				<p class="absolute bottom-0 text-xs font-semibold text-black">
					{percentage.toFixed(0)} % Completion
				</p>
			</div>

			<div class="flex flex-col gap-[10px]">
				<div class="">
					<p class="text-base text-muted-foreground">
						FACULTY: <strong class="text-black">{dashboardRoute.getActiveProf()?.fullname}</strong>
					</p>
				</div>

				{#each dashboardRoute.getEvals() ?? [] as evaluationForm}
					<p class="text-center text-xl font-semibold text-primary">
						{evaluationForm.evaluation_title}
					</p>

					<div class="">
						<p class="font-semibold">Direction:</p>
						<p class="text-sm leading-7 text-muted-foreground">
							This questionnare seeks your objective, honest and fair evaluation of your teacher in
							this subject. The highest possible rating is 5, the lowest is 1. All items are
							required.
						</p>
					</div>

					<!--Dynamic Questionares from database uploaded by admins-->
					<div class="flex flex-col gap-[20px] border-t-[1px] border-slate-300 py-[10px]">
						{#each evaluationForm.evaluation_data as evaluation, index}
							<p class="font-semibold text-primary">{evaluation.headerTitle}</p>
							<div class="flex flex-col gap-[10px]">
								{#each evaluation.questions as questionObj, innerIndex}
									<CustomRadioGroup {questionObj} index={innerIndex} />
								{/each}
							</div>
						{/each}
					</div>
				{/each}

				<div class="flex justify-end">
					<Button onclick={() => console.log(dashboardRoute.getAnswers())}>Submit</Button>
				</div>
			</div>
		</div>
	</div>
{/if}
