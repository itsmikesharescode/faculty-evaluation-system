<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label/index';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Paintbrush, Plus, Trash2, CloudUpload } from 'lucide-svelte';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { fromAdminRouteState } from '../../_states/fromAdminRoute.svelte';
	import { z } from 'zod';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';

	// Adjust the schema creation function's return type
	const createEvalSchema = (
		headerTitleCount: number,
		questionCounts: number[]
	): z.ZodObject<{ [key: string]: z.ZodString }> => {
		let schema = z.object({
			evalTitle: z.string().min(1, 'Evaluation title is required')
		}) as z.ZodObject<{ [key: string]: z.ZodString }>;

		for (let i = 0; i < headerTitleCount; i++) {
			schema = schema.extend({
				[`headerTitle${i + 1}`]: z.string().min(1, { message: `Must enter header title ${i + 1}` })
			});

			for (let j = 0; j < questionCounts[i]; j++) {
				schema = schema.extend({
					[`question${i + 1}_${j + 1}`]: z
						.string()
						.min(1, { message: `Must enter question ${j + 1}` })
				});
			}
		}

		return schema;
	};

	interface FormData {
		evalTitle: string;
		headerTitles: Record<string, string>;
		questions: Record<string, string>;
	}

	type ErrorField = { _errors: string[] };

	interface Errors {
		[key: string]: ErrorField | undefined;
		evalTitle?: ErrorField;
	}

	interface TrackerItem {
		id: string;
		questions: { id: string }[];
	}

	const route = fromAdminRouteState();
	route.setRoute('/admin-questionnaire');

	let headerTitleTracker = $state<TrackerItem[]>([
		{
			id: crypto.randomUUID(),
			questions: [{ id: crypto.randomUUID() }]
		}
	]);

	const incrementQuestion = (titleIndex: number) => {
		headerTitleTracker[titleIndex].questions.push({ id: crypto.randomUUID() });
	};

	const removeQuestion = (removeParam: { titleIndex: number; questionId: string }) => {
		headerTitleTracker[removeParam.titleIndex].questions = headerTitleTracker[
			removeParam.titleIndex
		].questions.filter((item) => item.id !== removeParam.questionId);
	};

	const incrementTitle = () => {
		headerTitleTracker.push({
			id: crypto.randomUUID(),
			questions: [{ id: crypto.randomUUID() }]
		});
	};

	const removeTitle = (titleId: string) => {
		headerTitleTracker = headerTitleTracker.filter((item) => item.id !== titleId);
	};

	let formData = $state<FormData>({ evalTitle: '', headerTitles: {}, questions: {} });
	let errors = $state<Errors>({});

	const handleSubmit = () => {
		// Generate final schema based on the current dynamic fields
		const finalSchema = createEvalSchema(
			headerTitleTracker.length,
			headerTitleTracker.map((ht) => ht.questions.length)
		);

		// Gather form data for validation
		const dataToValidate = {
			evalTitle: formData.evalTitle,
			...headerTitleTracker.reduce<Record<string, string>>((acc, headerTitle, headerIndex) => {
				acc[`headerTitle${headerIndex + 1}`] = formData.headerTitles[headerTitle.id] || '';

				headerTitle.questions.forEach((question, questionIndex) => {
					acc[`question${headerIndex + 1}_${questionIndex + 1}`] =
						formData.questions[question.id] || '';
				});

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
			// Structure the data in the desired format
			const structuredData = headerTitleTracker.map((headerTitle, headerIndex) => ({
				id: headerTitle.id,
				headerTitle: formData.headerTitles[headerTitle.id],
				questions: headerTitle.questions.map((question, questionIndex) => ({
					id: question.id,
					question: formData.questions[question.id]
				}))
			}));

			console.log('Structured data:', structuredData);
			// You can now use structuredData for further processing or sending to a server
			errors = {};
		}
	};
</script>

<div class="sticky top-[3rem] bg-secondary px-[0.625rem] py-[1.25rem]">
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

<div
	class="flex min-h-screen flex-col gap-[0.625rem] border-l-[1px] border-slate-300 bg-secondary p-[0.625rem]"
>
	<div class="rounded-lg bg-white px-[0.625rem] py-[1.25rem] shadow-lg">
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
			class="flex flex-col gap-[0.625rem] rounded-lg bg-white p-[1rem] shadow-lg"
			animate:flip={{ duration: 350 }}
		>
			<div class="grid w-full items-center gap-1.5">
				<Label for={headerTitleTrack.id} class="font-semibold">Header Title {index + 1}</Label>
				<Input
					type="text"
					id={headerTitleTrack.id}
					bind:value={formData.headerTitles[headerTitleTrack.id]}
					placeholder={`Enter your header title ${index + 1}`}
				/>
				{#if errors[`headerTitle${index + 1}` as keyof Errors]}
					<p class="text-sm text-red-500">
						{errors[`headerTitle${index + 1}` as keyof Errors]?._errors[0]}
					</p>
				{/if}
			</div>

			<div class="flex flex-col gap-[0.625rem] border-l-[2px] border-primary p-[1rem]">
				{#each headerTitleTrack.questions as questionTracker, innerIndex (questionTracker)}
					<div
						id={questionTracker.id}
						class="rounded-lg bg-secondary px-[0.625rem] py-[1.25rem]"
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
							{#if errors[`question${index + 1}_${innerIndex + 1}` as keyof Errors]}
								<p class="text-sm text-red-500">
									{errors[`question${index + 1}_${innerIndex + 1}` as keyof Errors]?._errors[0]}
								</p>
							{/if}
						</div>

						<div class="mt-[1.25rem] flex items-center justify-end gap-[5px]">
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
								Reset
							</Button>
						{/if}
					</div>

					{#if headerTitleTracker.length > 1}
						<Button
							variant="destructive"
							onclick={() => removeTitle(headerTitleTrack.id)}
							class="flex items-center gap-[5px]"
						>
							<Trash2 class="h-[15px] w-[15px]" />
							Remove Title {index + 1}
						</Button>
					{/if}
				</div>
			</div>
		</div>
	{/each}

	<div class="flex items-center justify-between gap-[5px]">
		<Button onclick={incrementTitle} class="flex items-center gap-[5px]">
			<Plus class="h-[15px] w-[15px]" />
			More Header Titles
		</Button>

		<Button onclick={handleSubmit} class="flex items-center gap-[5px]">
			<CloudUpload class="h-[15px] w-[15px]" />
			Upload Form
		</Button>
	</div>
</div>
