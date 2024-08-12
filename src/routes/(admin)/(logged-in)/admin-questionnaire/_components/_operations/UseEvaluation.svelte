<script lang="ts">
	import { enhance } from '$app/forms';
	import type { EvaluationType, ResultModel } from '$lib/types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Loader } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { fromQuestionnaireRouteState } from '../../../_states/fromAdminQuestionnaire.svelte';
	import { toast } from 'svelte-sonner';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';

	interface Props {
		useSignal: boolean;
	}

	let { useSignal = $bindable() }: Props = $props();

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
					questionnaireRoute.setActive(null);
					useSignal = false;
					break;

				case 401:
					toast.error('Display Evaluation', { description: data.msg });
					useLoader = false;
					break;
			}
		};
	};
</script>

<AlertDialog.Root bind:open={useSignal}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Make this default?</AlertDialog.Title>
			<AlertDialog.Description>
				This form will be displayed to students for evaluation purposes.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<Button
				variant="secondary"
				onclick={() => {
					questionnaireRoute.setActive(null);
					useSignal = false;
				}}
			>
				Cancel
			</Button>

			<form method="post" action="?/useEvalEvent" use:enhance={useEvalEvent}>
				<input name="evalId" type="hidden" value={questionnaireRoute.getActive()?.id} />
				<Button disabled={useLoader} type="submit" class="relative">
					{#if useLoader}
						<div
							class="absolute flex h-full w-full items-center justify-center rounded-lg bg-primary"
						>
							<Loader class="h-[15px] w-[15px] animate-spin" />
						</div>
					{/if}

					Continue
				</Button>
			</form>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
