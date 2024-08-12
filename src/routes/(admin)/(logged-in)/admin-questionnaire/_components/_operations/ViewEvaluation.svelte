<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { X } from 'lucide-svelte';
	import { Label } from '$lib/components/ui/label';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { fromQuestionnaireRouteState } from '../../../_states/fromAdminQuestionnaire.svelte';

	interface Props {
		viewSignal: boolean;
	}

	let { viewSignal = $bindable() }: Props = $props();

	const questionnaireRoute = fromQuestionnaireRouteState();

	// Reactive state to track selected answers
	let selectedAnswers: Record<string, string> = {};

	// Function to update the selected answer for a question
	function updateAnswer(questionId: string, value: string) {
		selectedAnswers = { ...selectedAnswers, [questionId]: value };
	}
</script>

<AlertDialog.Root bind:open={viewSignal}>
	<AlertDialog.Content class="flex h-screen max-w-full flex-col gap-[1.25rem]">
		<button
			onclick={() => {
				questionnaireRoute.setActive(null);
				viewSignal = false;
			}}
			class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
		>
			<X class="h-4 w-4" />
			<span class="sr-only">Close</span>
		</button>

		<AlertDialog.Header>
			<AlertDialog.Title>
				<strong class="text-muted-foreground">You are viewing</strong>
				{questionnaireRoute.getActive()?.evaluation_title}
			</AlertDialog.Title>
			<AlertDialog.Description>Viewing evaluation form</AlertDialog.Description>
		</AlertDialog.Header>

		<div class="overflow-auto">
			{#each questionnaireRoute.getActive()?.evaluation_data ?? [] as evaluationForm, index}
				<div>
					<p class="text-center text-xl font-semibold">{evaluationForm.headerTitle}</p>
					<div class="p-[0.625rem]">
						{#each evaluationForm.questions as question, innerIndex}
							<p class="text-sm">{question.question}</p>

							<div class="p-[0.625rem]">
								<RadioGroup.Root
									value={selectedAnswers[question.id] || ''}
									on:change={(event) => updateAnswer(question.id, event.detail)}
								>
									<div class="flex items-center space-x-2">
										<RadioGroup.Item value="outstanding" id={`r1${question.id}`} />
										<Label class="text-sm" for={`r1${question.id}`}>
											Always
											<strong class="text-muted-foreground">(5)</strong>
										</Label>
									</div>
									<div class="flex items-center space-x-2">
										<RadioGroup.Item value="verysatisfactory" id={`r2${question.id}`} />
										<Label class="text-sm" for={`r2${question.id}`}>
											Often
											<strong class="text-muted-foreground">(4) </strong>
										</Label>
									</div>
									<div class="flex items-center space-x-2">
										<RadioGroup.Item value="satisfactory" id={`r3${question.id}`} />
										<Label class="text-sm" for={`r3${question.id}`}>
											Sometimes
											<strong class="text-muted-foreground">(3)</strong>
										</Label>
									</div>

									<div class="flex items-center space-x-2">
										<RadioGroup.Item value="fair" id={`r4${question.id}`} />
										<Label class="text-sm" for={`r4${question.id}`}>
											Rarely
											<strong class="text-muted-foreground">(2)</strong>
										</Label>
									</div>

									<div class="flex items-center space-x-2">
										<RadioGroup.Item value="needsimprovement" id={`r5${question.id}`} />
										<Label class="text-sm" for={`r5${question.id}`}>
											Never
											<strong class="text-muted-foreground">(1)</strong>
										</Label>
									</div>
									<RadioGroup.Input name={`question-${question.id}`} />
								</RadioGroup.Root>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</AlertDialog.Content>
</AlertDialog.Root>
