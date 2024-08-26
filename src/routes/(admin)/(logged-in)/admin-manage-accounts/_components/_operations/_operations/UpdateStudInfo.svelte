<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import type { ResultModel, StudentType } from '$lib/types';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { fromManageAccountRouteState } from '../../../../_states/fromAdminManageAccounts.svelte';
	import * as Select from '$lib/components/ui/select/index.js';
	import {
		updateStudInfoSchema,
		type UpdateStudInfoSchema
	} from '../../../admin-manage-accounts-schema';
	import { toast } from 'svelte-sonner';
	import { courseNames } from '$lib';
	import { CircleHelp, Loader } from 'lucide-svelte';
	import * as Popover from '$lib/components/ui/popover';

	interface Props {
		student: StudentType;
		updateSignal: boolean;
		updateStudInfoForm: SuperValidated<Infer<UpdateStudInfoSchema>>;
	}

	let { updateSignal = $bindable(), ...props }: Props = $props();

	const manageAccountRoute = fromManageAccountRouteState();

	const form = superForm(props.updateStudInfoForm, {
		validators: zodClient(updateStudInfoSchema),
		id: crypto.randomUUID(),
		invalidateAll: false,
		onUpdate({ result }) {
			const { status, data } = result as ResultModel<{ msg: string; data: StudentType[] }>;
			switch (status) {
				case 200:
					toast.success('Update Account', { description: data.msg });
					manageAccountRoute.setStudents(data.data);
					updateSignal = false;
					break;
				case 401:
					toast.error('Update Account', { description: data.msg });
					break;
			}
		}
	});

	const { form: formData, enhance, submitting } = form;

	const selectedGender = $derived(
		$formData.gender ? { label: $formData.gender, value: $formData.gender } : undefined
	);

	const yearLevel = $derived(
		$formData.yearLevel ? { label: $formData.yearLevel, value: $formData.yearLevel } : undefined
	);

	const courseName = $derived(
		$formData.course ? { label: $formData.course, value: $formData.course } : undefined
	);

	const loadInitialData = () => {
		$formData.idNumber = props.student.user_meta_data.id_number;
		$formData.firstName = props.student.user_meta_data.fullname.split(',')[1];
		$formData.middleInitial = props.student.user_meta_data.fullname.split(',')[2];
		$formData.lastName = props.student.user_meta_data.fullname.split(',')[0];
		$formData.nameSuffix = props.student.user_meta_data.suffix;
		$formData.gender = props.student.user_meta_data.gender;
		$formData.yearLevel = props.student.user_meta_data.year_level;
		$formData.course = props.student.user_meta_data.course;
		$formData.sections = props.student.user_meta_data.section;
	};

	$effect(() => {
		if (updateSignal) loadInitialData();
	});
</script>

<form
	method="POST"
	action="?/updateStudInfoEvent"
	use:enhance
	class="flex flex-col gap-[10px] overflow-auto px-[1.5rem] pb-[1.5rem]"
>
	<div class="grid gap-[0.625rem] sm:grid-cols-2">
		<Form.Field {form} name="studentId" class="hidden">
			<Form.Control let:attrs>
				<Input {...attrs} value={props.student.student_id} />
			</Form.Control>
		</Form.Field>
		<div>
			<Form.Field {form} name="idNumber">
				<Form.Control let:attrs>
					<Form.Label>ID Number</Form.Label>
					<Input {...attrs} bind:value={$formData.idNumber} placeholder="Enter student id number" />
				</Form.Control>

				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="firstName">
				<Form.Control let:attrs>
					<Form.Label>First Name</Form.Label>
					<Input
						{...attrs}
						bind:value={$formData.firstName}
						placeholder="Enter student first name"
					/>
				</Form.Control>

				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="middleInitial">
				<Form.Control let:attrs>
					<Form.Label>Middle Initial</Form.Label>
					<Input
						{...attrs}
						bind:value={$formData.middleInitial}
						placeholder="Enter student middle initial"
					/>
				</Form.Control>

				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="lastName">
				<Form.Control let:attrs>
					<Form.Label>Last Name</Form.Label>
					<Input {...attrs} bind:value={$formData.lastName} placeholder="Enter student last name" />
				</Form.Control>

				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="nameSuffix">
				<Form.Control let:attrs>
					<Form.Label>Name Suffix (optional)</Form.Label>
					<Input
						{...attrs}
						bind:value={$formData.nameSuffix}
						placeholder="Enter student name suffix"
					/>
				</Form.Control>

				<Form.FieldErrors />
			</Form.Field>
		</div>
		<div>
			<Form.Field {form} name="gender">
				<Form.Control let:attrs>
					<Form.Label>Gender</Form.Label>
					<Select.Root
						selected={selectedGender}
						onSelectedChange={(v) => {
							v && ($formData.gender = v.value);
						}}
					>
						<Select.Trigger {...attrs}>
							<Select.Value placeholder="Select student gender" />
						</Select.Trigger>
						<Select.Content>
							<Select.Item value="Male" label="Male" />
							<Select.Item value="Female" label="Female" />
						</Select.Content>
					</Select.Root>
					<input hidden bind:value={$formData.gender} name={attrs.name} />
				</Form.Control>

				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="yearLevel">
				<Form.Control let:attrs>
					<Form.Label>Year Level</Form.Label>
					<Select.Root
						selected={yearLevel}
						onSelectedChange={(v) => {
							v && ($formData.yearLevel = v.value);
						}}
					>
						<Select.Trigger {...attrs}>
							<Select.Value placeholder="Select student year level" />
						</Select.Trigger>
						<Select.Content>
							<Select.Item value="First Year" label="First Year" />
							<Select.Item value="Second Year" label="Second Year" />
							<Select.Item value="Third Year" label="Third Year" />
							<Select.Item value="Fourth Year" label="Fourth Year" />
						</Select.Content>
					</Select.Root>
					<input hidden bind:value={$formData.yearLevel} name={attrs.name} />
				</Form.Control>

				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="course">
				<Form.Control let:attrs>
					<Form.Label>Course</Form.Label>
					<Select.Root
						selected={courseName}
						onSelectedChange={(v) => {
							v && ($formData.course = v.value);
						}}
					>
						<Select.Trigger {...attrs}>
							<Select.Value placeholder="Select your course" />
						</Select.Trigger>
						<Select.Content>
							{#each courseNames as course}
								<Select.Item value={course} label={course} />
							{/each}
						</Select.Content>
					</Select.Root>
					<input hidden bind:value={$formData.course} name={attrs.name} />
				</Form.Control>

				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="sections">
				<Form.Control let:attrs>
					<Form.Label>Section</Form.Label>
					<div class="relative flex items-center">
						<Input
							{...attrs}
							bind:value={$formData.sections}
							placeholder="Enter student section"
							class="pr-[2rem]"
						/>
						<Popover.Root>
							<Popover.Trigger class="absolute right-0 mr-[5px]">
								<CircleHelp />
							</Popover.Trigger>
							<Popover.Content>
								<p class="text-sm leading-7">
									Please use formats like <strong>24BSIS-1M, 24BSIS-2M, 23BSIS-2P1E</strong>.
								</p>

								<p class="text-sm leading-7">Example:</p>
								<p class="text-sm leading-7">Single section: <strong>24BSIS-1M</strong></p>
								<p class="text-sm leading-7">
									Multiple section: <strong>24BSIS-1M, 24BSIS-2M, 23BSIS-2P1E</strong>.
								</p>
							</Popover.Content>
						</Popover.Root>
					</div>
				</Form.Control>

				<Form.FieldErrors />
			</Form.Field>
		</div>
	</div>

	<div class=" flex justify-end">
		<Form.Button disabled={$submitting} class="relative">
			{#if $submitting}
				<div class="absolute flex h-full w-full items-center justify-center rounded-lg bg-primary">
					<Loader class="h-[15px] w-[15px] animate-spin" />
				</div>
			{/if}
			Update Information
		</Form.Button>
	</div>
</form>
