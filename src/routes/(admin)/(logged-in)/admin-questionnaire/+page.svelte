<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Loader, MoveUpRight } from 'lucide-svelte';
	import { fromQuestionnaireRouteState } from '../_states/fromAdminQuestionnaire.svelte';
	import { fromAdminRouteState } from '../_states/fromAdminRoute.svelte';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { EvaluationType, ResultModel } from '$lib/types';
	import UseEvaluation from './_components/_operations/UseEvaluation.svelte';

	const route = fromAdminRouteState();
	const questionnaireRoute = fromQuestionnaireRouteState();

	route.setRoute('/admin-questionnaire');
</script>

<div class="min-h-screen border-l-[1px] border-slate-300 p-[10px]">
	<div class="flex flex-col gap-[10px]">
		<div class="sticky top-[3.3rem] transition-all">
			<a
				href="/admin-questionnaire/create"
				class="flex max-w-fit items-center gap-[5px] bg-primary p-[10px] text-sm font-semibold text-white"
				>Create Questionnaires <MoveUpRight class="h-[15px] w-[15px]" /></a
			>
		</div>

		<div class="flex flex-col gap-[20px]">
			{#if questionnaireRoute.getEvaluation()?.length}
				{#each questionnaireRoute.getEvaluation() ?? [] as evaluationForms}
					<div class="rounded-lg border-black bg-secondary p-[20px] shadow-lg">
						<div class="">
							<p>Evaluation Title: {evaluationForms.evaluation_title}</p>
							<p>Selection Range: 1 - 5</p>
							<p>
								Total Questions: {evaluationForms.evaluation_data
									.map((item) => item.questions.length)
									.reduce((cv, ac) => cv + ac)}
							</p>
						</div>
						<div class="flex items-center justify-end gap-[5px]">
							<UseEvaluation {evaluationForms} />
							<Button variant="destructive">Delete</Button>
							<Button>View</Button>
						</div>
					</div>
				{/each}
			{:else}
				<div class="flex min-h-[20dvh] flex-col items-center justify-center">
					<p class="text-muted-foreground">There is no evaluation form.</p>
				</div>
			{/if}
		</div>
	</div>
</div>
