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
	import { array, number } from 'zod';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';

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

	let headerTitleTracker = $state([
		{
			id: crypto.randomUUID(),
			questions: [
				{
					id: crypto.randomUUID()
				}
			]
		}
	]);

	const incrementQuestion = (titleIndex: number) => {
		headerTitleTracker[titleIndex].questions.push({ id: crypto.randomUUID() });
	};

	const removeQuestion = (removeParam: { titleIndex: number; questionId: string }) => {
		const newQ = headerTitleTracker[removeParam.titleIndex].questions.filter(
			(item) => item.id !== removeParam.questionId
		);

		headerTitleTracker = [
			...headerTitleTracker.slice(0, removeParam.titleIndex),
			{
				...headerTitleTracker[removeParam.titleIndex],
				questions: newQ
			},
			...headerTitleTracker.slice(removeParam.titleIndex + 1)
		];
	};

	const incrementTitle = () => {
		headerTitleTracker.push({ id: crypto.randomUUID(), questions: [{ id: crypto.randomUUID() }] });
	};

	const removeTitle = (titleId: string) => {
		headerTitleTracker = headerTitleTracker.filter((item) => item.id !== titleId);
	};

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
</script>

<div
	class="flex min-h-screen flex-col gap-[10px] border-l-[1px] border-slate-300 bg-secondary p-[10px]"
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
			<Label for="evalTitle" class="font-semibold">Evaluation Title</Label>
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

	{#each headerTitleTracker as headerTitleTrack, index (headerTitleTrack)}
		<div
			class="flex flex-col gap-[10px] rounded-lg bg-white p-[1rem] shadow-lg"
			animate:flip={{ duration: 350 }}
		>
			<div class="grid w-full items-center gap-1.5">
				<Label for={headerTitleTrack.id} class="font-semibold">Header Title {index + 1}</Label>
				<Input
					type="text"
					id={headerTitleTrack.id}
					bind:value={formData.questions[headerTitleTrack.id]}
					placeholder={`Enter your header title ${index + 1}`}
				/>
				{#if errors[`question${index + 1}` as keyof Errors]}
					<p class="text-sm text-red-500">
						{errors[`question${index + 1}` as keyof Errors]?._errors[0]}
					</p>
				{/if}
			</div>

			<div class="flex flex-col gap-[10px] bg-secondary p-[1rem]">
				{#each headerTitleTrack.questions as questionTracker, innerIndex (questionTracker)}
					<div
						id={questionTracker.id}
						class=" rounded-lg bg-white px-[10px] py-[20px] shadow-lg"
						in:fade
						animate:flip={{ duration: 350 }}
					>
						<div class="grid w-full items-center gap-1.5">
							<Label for={questionTracker.id}>Question {innerIndex + 1}</Label>
							<Textarea
								id={questionTracker.id}
								bind:value={formData.questions[questionTracker.id]}
								placeholder={`Enter your question ${innerIndex + 1}`}
							/>
							{#if errors[`question${innerIndex + 1}` as keyof Errors]}
								<p class="text-sm text-red-500">
									{errors[`question${innerIndex + 1}` as keyof Errors]?._errors[0]}
								</p>
							{/if}
						</div>

						<div class="mt-[20px] flex items-center justify-end gap-[5px]">
							{#if headerTitleTracker[index].questions.length > 1}
								<Button
									variant="destructive"
									class="flex items-center gap-[5px]"
									onclick={() =>
										removeQuestion({ titleIndex: index, questionId: questionTracker.id })}
								>
									<Trash2 class="h-[15px] w-[15px]" />
									Remove Question {innerIndex + 1}
								</Button>
							{/if}
						</div>
					</div>
				{/each}

				<div class="flex items-center justify-between gap-[5px] overflow-auto">
					<div class="flex items-center gap-[5px]">
						<Button onclick={() => incrementQuestion(index)} class="flex items-center gap-[5px]">
							<Plus class="h-[15px] w-[15px]" />
							More Question
						</Button>

						{#if headerTitleTracker[index].questions.length > 3}
							<Button
								onclick={() => {
									const lastQuestionValue = headerTitleTracker[index].questions[0];
									headerTitleTracker[index].questions = [];
									headerTitleTracker[index].questions.push(lastQuestionValue);
								}}
								class="flex items-center gap-[5px]"
								variant="destructive"
							>
								<Paintbrush class="h-[15px] w-[15px]" />
								Delete {headerTitleTracker[index].questions.length - 1} Questions
							</Button>
						{/if}
					</div>

					{#if headerTitleTracker.length > 1}
						<Button
							variant="destructive"
							class="flex items-center gap-[5px]"
							onclick={() => removeTitle(headerTitleTrack.id)}
						>
							<Trash2 class="h-[15px] w-[15px]" />
							Remove Title {index + 1}
						</Button>
					{/if}
				</div>
			</div>
		</div>
	{/each}

	<div class=" flex items-center gap-[5px] overflow-auto">
		<Button onclick={incrementTitle} class="flex items-center gap-[5px]">
			<Plus class="h-[15px] w-[15px]" />
			More Title
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

<!-- <Button onclick={handleSubmit} class="flex items-center gap-[5px]">
	<CloudUpload class="h-[15px] w-[15px]" />
	Upload
</Button> -->
