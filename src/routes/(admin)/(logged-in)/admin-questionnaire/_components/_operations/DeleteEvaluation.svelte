<script lang="ts">
	import { enhance } from '$app/forms';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Loader } from 'lucide-svelte';
	import { fromQuestionnaireRouteState } from '../../../_states/fromAdminQuestionnaire.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';
	import type { EvaluationType, ResultModel } from '$lib/types';

	interface Props {
		deleteSignal: boolean;
		evalForm: EvaluationType;
	}

	let { deleteSignal = $bindable(), ...props }: Props = $props();

	const questionnaireRoute = fromQuestionnaireRouteState();

	let deleteLoader = $state(false);

	const deleteEvalEvent: SubmitFunction = () => {
		deleteLoader = true;
		return async ({ result }) => {
			const { status, data } = result as ResultModel<{ msg: string; data: EvaluationType[] }>;

			switch (status) {
				case 200:
					toast.success('Delete Evaluation', { description: data.msg });
					questionnaireRoute.setEvaluation(data.data);
					deleteSignal = false;
					deleteLoader = false;
					break;

				case 401:
					toast.error('Delete Evaluation', { description: data.msg });
					deleteLoader = false;
					break;
			}
		};
	};
</script>

<AlertDialog.Root bind:open={deleteSignal}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
			<AlertDialog.Description>
				This action cannot be undone. This will permanently delete the evaluation data from the
				database.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<Button
				variant="secondary"
				onclick={() => {
					deleteSignal = false;
				}}
			>
				Cancel
			</Button>
			<form method="post" action="?/deleteEvalEvent" use:enhance={deleteEvalEvent}>
				<input name="evalId" type="hidden" value={props.evalForm.id} />
				<Button disabled={deleteLoader} type="submit" class="relative">
					{#if deleteLoader}
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
