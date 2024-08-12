<script lang="ts">
	import { enhance } from '$app/forms';
	import type { EvaluationType, ResultModel } from '$lib/types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Loader } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { fromQuestionnaireRouteState } from '../../../_states/fromAdminQuestionnaire.svelte';
	import { toast } from 'svelte-sonner';

	interface Props {
		evaluationForms: EvaluationType;
	}

	const { evaluationForms }: Props = $props();

	const questionnaireRoute = fromQuestionnaireRouteState();

	let useLoader = $state(false);
	const useEvalEvent: SubmitFunction = () => {
		useLoader = true;
		return async ({ result }) => {
			const { status, data } = result as ResultModel<{ msg: string; data: EvaluationType[] }>;

			switch (status) {
				case 200:
					useLoader = false;
					questionnaireRoute.setEvaluation(data.data);
					toast.success('Display Evaluation', { description: data.msg });
					break;

				case 401:
					toast.error('Display Evaluation', { description: data.msg });
					useLoader = false;
					break;
			}
		};
	};
</script>

<form method="post" action="?/useEvalEvent" use:enhance={useEvalEvent}>
	<input name="evalId" type="hidden" value={evaluationForms.id} />
	<Button disabled={useLoader || evaluationForms.is_used} type="submit" class="relative">
		{#if useLoader}
			<div class="absolute flex h-full w-full items-center justify-center rounded-lg bg-primary">
				<Loader class="h-[15px] w-[15px] animate-spin" />
			</div>
		{/if}

		Use
	</Button>
</form>
