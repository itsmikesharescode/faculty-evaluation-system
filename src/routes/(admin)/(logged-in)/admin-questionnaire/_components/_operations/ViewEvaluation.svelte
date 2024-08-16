<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { X } from 'lucide-svelte';
	import { Label } from '$lib/components/ui/label';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { fromQuestionnaireRouteState } from '../../../_states/fromAdminQuestionnaire.svelte';
	import { SvelteMap } from 'svelte/reactivity';
	import AdminCustomRadio from '../AdminCustomRadio.svelte';

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
			<AlertDialog.Title>
				<strong class="text-muted-foreground">You are viewing</strong>
				{questionnaireRoute.getActive()?.evaluation_title}
			</AlertDialog.Title>
			<AlertDialog.Description>
				Thoroughly reviewing an evaluation form can help identify and rectify potential errors
				before proceeding to production.
			</AlertDialog.Description>
		</AlertDialog.Header>

		<div class="overflow-auto">
			{#each questionnaireRoute.getActive()?.evaluation_data ?? [] as evaluationForm, index}
				<div>
					<div class="">
						<p class="text-xl font-semibold text-primary">{evaluationForm.headerTitle}</p>
						<div class="h-[0.25rem] w-[1.875rem] bg-yellow-500"></div>
					</div>

					<div class="p-[0.625rem]">
						{#each evaluationForm.questions as questionObj, innerIndex}
							<AdminCustomRadio {questionObj} index={innerIndex} />
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</AlertDialog.Content>
</AlertDialog.Root>
