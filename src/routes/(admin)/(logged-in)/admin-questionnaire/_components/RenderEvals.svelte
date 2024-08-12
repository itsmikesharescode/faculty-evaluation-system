<script lang="ts">
	import { fromQuestionnaireRouteState } from '../../_states/fromAdminQuestionnaire.svelte';
	import UseEvaluation from './_operations/UseEvaluation.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import DeleteEvaluation from './_operations/DeleteEvaluation.svelte';
	import { EllipsisVertical } from 'lucide-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

	const questionnaireRoute = fromQuestionnaireRouteState();

	let deleteSignal = $state(false);
	let useSignal = $state(false);
</script>

<div class="flex flex-col gap-[20px]">
	{#if questionnaireRoute.getEvaluation()?.length}
		{#each questionnaireRoute.getEvaluation() ?? [] as evaluationForms}
			<div
				class="relative flex items-center rounded-lg border-black bg-secondary p-[20px] shadow-lg"
			>
				{#if evaluationForms.is_used}
					<div
						class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-lg bg-[#00000050]"
					>
						<p class="rounded-sm bg-black p-[0.625rem] text-primary">Currently Using</p>
					</div>
				{/if}

				<div class="">
					<div class="flex flex-wrap gap-[0.3rem]">
						<p class="text-muted-foreground">Evaluation Title:</p>
						<p>{evaluationForms.evaluation_title}</p>
					</div>

					<div class="flex flex-wrap gap-[0.3rem]">
						<p class="text-muted-foreground">Total Questions:</p>
						<p>
							{evaluationForms.evaluation_data
								.map((item) => item.questions.length)
								.reduce((cv, ac) => cv + ac)}
						</p>
					</div>
				</div>

				<div class="absolute right-0">
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							<EllipsisVertical />
						</DropdownMenu.Trigger>
						<DropdownMenu.Content>
							<DropdownMenu.Group>
								<DropdownMenu.Label class="flex items-center justify-center"
									>Actions</DropdownMenu.Label
								>
								<DropdownMenu.Separator />
								<DropdownMenu.Item
									class="flex items-center justify-center"
									onclick={() => {
										questionnaireRoute.setActive(evaluationForms);
										useSignal = true;
									}}
								>
									Use
								</DropdownMenu.Item>
								<DropdownMenu.Item class="flex items-center justify-center">View</DropdownMenu.Item>
								<DropdownMenu.Item
									class="flex items-center justify-center"
									onclick={() => {
										questionnaireRoute.setActive(evaluationForms);
										deleteSignal = true;
									}}
								>
									Delete
								</DropdownMenu.Item>
							</DropdownMenu.Group>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</div>
			</div>
		{/each}
	{:else}
		<div class="flex min-h-[20dvh] flex-col items-center justify-center">
			<p class="text-muted-foreground">There is no evaluation form.</p>
		</div>
	{/if}
</div>

<!--Delete Modal-->
<UseEvaluation bind:useSignal />
<DeleteEvaluation bind:deleteSignal />
