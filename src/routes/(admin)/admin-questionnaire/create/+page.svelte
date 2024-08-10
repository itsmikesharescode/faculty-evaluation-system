<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label/index';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Paintbrush, Plus, Trash2, CloudUpload } from 'lucide-svelte';
	import { createEvalSchema, addDynamicFields } from '../admin-questionnaire-schema';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { fromAdminRouteState } from '../../_states/fromAdminRoute.svelte';
	import { goto } from '$app/navigation';

	interface FormData {
		evalTitle: string;
		questions: Record<string, string>;
	}

	type ErrorField = { _errors: string[] };

	interface Errors {
		[key: string]: ErrorField | undefined;
		evalTitle?: ErrorField;
	}

	interface TrackerItem {
		id: string;
	}

	const route = fromAdminRouteState();
	route.setRoute('/admin-questionnaire');

	// Reactive state to track the dynamic fields
	let tracker = $state<TrackerItem[]>([{ id: crypto.randomUUID() }]);
	let formData = $state<FormData>({ evalTitle: '', questions: {} });
	let errors = $state<Errors>({});

	// Handle form submission
	const handleSubmit = () => {
		// Generate final schema based on the current number of dynamic fields
		const finalSchema = addDynamicFields(createEvalSchema, tracker.length);

		// Gather form data
		const dataToValidate = {
			evalTitle: formData.evalTitle,
			...tracker.reduce<Record<string, string>>((acc, { id }, index) => {
				acc[`question${index + 1}`] = formData.questions[id] || '';
				return acc;
			}, {})
		};

		// Validate the form data against the schema
		const validationResult = finalSchema.safeParse(dataToValidate);

		if (!validationResult.success) {
			console.log(validationResult.error.format());
			errors = validationResult.error.format() as Errors;
		} else {
			console.log('Validation successful:', validationResult.data);
			// Proceed with form submission or further processing
			errors = {};
		}
	};

	// Function to add a new question field
	const addQuestion = () => {
		tracker = [...tracker, { id: crypto.randomUUID() }];
		goto(`/admin-questionnaire/create?#${tracker[tracker.length - 1].id}`);
	};

	// Function to remove the last question field
	const removeQuestion = (id: string) => {
		if (tracker.length > 1) {
			tracker = tracker.filter((item) => item.id !== id);
		}
	};
</script>

<div
	class="flex min-h-screen flex-col gap-[20px] border-l-[1px] border-slate-300 bg-secondary p-[10px]"
>
	<div class="sticky top-[3rem] bg-secondary py-[20px]">
		<Breadcrumb.Root>
			<Breadcrumb.List>
				<Breadcrumb.Item>
					<Breadcrumb.Link href="/admin-questionnaire">Questionnaires</Breadcrumb.Link>
				</Breadcrumb.Item>
				<Breadcrumb.Separator />
				<Breadcrumb.Item>
					<Breadcrumb.Page>Create Evaluation</Breadcrumb.Page>
				</Breadcrumb.Item>
			</Breadcrumb.List>
		</Breadcrumb.Root>
	</div>

	<div class="rounded-lg bg-white px-[10px] py-[20px] shadow-lg">
		<p class="text-center text-xl font-semibold">Evaluation Form Creation</p>
		<div class="grid w-full items-center gap-1.5">
			<Label for="evalTitle">Evaluation Title</Label>
			<Input
				type="text"
				id="evalTitle"
				bind:value={formData.evalTitle}
				placeholder="Enter the evaluation title"
			/>
			{#if errors.evalTitle}
				<p class="text-sm text-red-500">{errors.evalTitle._errors[0]}</p>
			{/if}
		</div>
	</div>
	{#each tracker as track, index (track)}
		<div
			id={track.id}
			class=" rounded-lg bg-white px-[10px] py-[20px] shadow-lg"
			in:fade
			animate:flip={{ duration: 350 }}
		>
			<div class="grid w-full items-center gap-1.5">
				<Label for={track.id}>Question {index + 1}</Label>
				<Input
					type="text"
					id={track.id}
					bind:value={formData.questions[track.id]}
					placeholder={`Enter your question ${index + 1}`}
				/>
				{#if errors[`question${index + 1}` as keyof Errors]}
					<p class="text-sm text-red-500">
						{errors[`question${index + 1}` as keyof Errors]?._errors[0]}
					</p>
				{/if}
			</div>

			<div class="mt-[20px] flex items-center justify-end gap-[5px]">
				{#if tracker.length > 1}
					<button
						onclick={() => removeQuestion(track.id)}
						class="flex items-center gap-[5px] bg-red-500 p-[10px] text-sm text-white"
					>
						<Trash2 class="h-[15px] w-[15px]" />
						Remove
					</button>
				{/if}
			</div>
		</div>
	{/each}

	<div class="sticky bottom-[1rem] flex items-center gap-[5px] overflow-auto">
		<Button onclick={addQuestion} class="flex items-center gap-[5px]">
			<Plus class="h-[15px] w-[15px]" />
			More Question
		</Button>

		<Button onclick={handleSubmit} class="flex items-center gap-[5px]">
			<CloudUpload class="h-[15px] w-[15px]" />
			Upload
		</Button>
		{#if tracker.length > 3}
			<Button
				onclick={() => {
					const lastValue = tracker[0];
					tracker = [];
					tracker.push(lastValue);
				}}
				class="flex items-center gap-[5px]"
				variant="destructive"
			>
				<Paintbrush class="h-[15px] w-[15px]" />
				Delete {tracker.length - 1} Questions
			</Button>
		{/if}
	</div>
</div>
