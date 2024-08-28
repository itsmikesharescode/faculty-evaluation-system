<script lang="ts">
	import { fromQuestionnaireRouteState } from '../../_states/fromAdminQuestionnaire.svelte';
	import Actions from './Actions.svelte';

	const questionnaireRoute = fromQuestionnaireRouteState();
</script>

<div class="flex flex-col gap-[20px]">
	{#if questionnaireRoute.getEvaluation()?.length}
		{#each questionnaireRoute.getEvaluation() ?? [] as evalForm, i}
			<div
				class="relative flex items-center rounded-lg border-black bg-secondary p-[20px] shadow-lg"
			>
				{#if evalForm.is_used}
					<div class="absolute right-0 top-0 m-[1rem] mr-[2rem]">
						<p class="rounded-sm bg-black px-[0.625rem] text-white">Active</p>
					</div>
				{/if}

				<div class="">
					<div class="flex flex-wrap gap-[0.3rem]">
						<p class="text-muted-foreground">Evaluation Title:</p>
						<p>{evalForm.evaluation_data.evalTitle}</p>
					</div>

					<div class="flex flex-wrap gap-[0.3rem]">
						<p class="text-muted-foreground">Total Questions:</p>
						<p>
							{evalForm.evaluation_data.headers
								.map((item) => item.questions.length)
								.reduce((cv, ac) => cv + ac)}
						</p>
					</div>
				</div>

				<div class="absolute right-0">
					<Actions {evalForm} />
				</div>
			</div>
		{/each}
	{:else}
		<div class="flex min-h-[20dvh] flex-col items-center justify-center">
			<p class="text-muted-foreground">There is no evaluation form.</p>
		</div>
	{/if}
</div>
