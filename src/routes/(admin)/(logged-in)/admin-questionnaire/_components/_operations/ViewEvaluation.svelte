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
			<AlertDialog.Title
				><strong class="text-muted-foreground">You are viewing</strong>
				{questionnaireRoute.getActive()?.evaluation_title}
			</AlertDialog.Title>
			<AlertDialog.Description>Viewting evaluation form</AlertDialog.Description>
		</AlertDialog.Header>

		<div class="overflow-auto">
			{#each questionnaireRoute.getActive()?.evaluation_data ?? [] as evaluationForm}
				<div class="">
					<p class="text-center text-xl font-semibold">{evaluationForm.headerTitle}</p>
					<div class="p-[0.625rem]">
						{#each evaluationForm.questions as question, index}
							<p class="text-sm">{question.question}</p>

							<div class="p-[0.625rem]">
								<RadioGroup.Root value="comfortable">
									<div class="flex items-center space-x-2">
										<RadioGroup.Item value="outstanding" id={`r1${index + 1}`} />
										<Label class="text-sm" for={`r1${index + 1}`}>
											Always
											<strong class="text-muted-foreground">(5)</strong>
										</Label>
									</div>
									<div class="flex items-center space-x-2">
										<RadioGroup.Item value="verysatisfactory" id={`r2${index + 1}`} />
										<Label class="text-sm" for={`r2${index + 1}`}>
											Often
											<strong class="text-muted-foreground">(4) </strong>
										</Label>
									</div>
									<div class="flex items-center space-x-2">
										<RadioGroup.Item value="satisfactory" id={`r3${index + 1}`} />
										<Label class="text-sm" for={`r3${index + 1}`}>
											Sometimes
											<strong class="text-muted-foreground">(3)</strong>
										</Label>
									</div>

									<div class="flex items-center space-x-2">
										<RadioGroup.Item value="fair" id={`r4${index + 1}`} />
										<Label class="text-sm" for={`r4${index + 1}`}>
											Rarely
											<strong class="text-muted-foreground">(2)</strong>
										</Label>
									</div>

									<div class="flex items-center space-x-2">
										<RadioGroup.Item value="needsimprovement" id={`r5${index + 1}`} />
										<Label class="text-sm" for={`r5${index + 1}`}>
											Never
											<strong class="text-muted-foreground">(1)</strong>
										</Label>
									</div>
									<RadioGroup.Input name="spacing" />
								</RadioGroup.Root>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</AlertDialog.Content>
</AlertDialog.Root>
