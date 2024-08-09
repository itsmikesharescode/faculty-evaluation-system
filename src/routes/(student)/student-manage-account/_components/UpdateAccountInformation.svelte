<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select/index.js';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { updateAccInfoSchema, type UpdateAccInfoSchema } from '../student-manage-account-schema';

	interface Props {
		updateAccInfoForm: SuperValidated<Infer<UpdateAccInfoSchema>>;
	}

	const { updateAccInfoForm }: Props = $props();

	const form = superForm(updateAccInfoForm, {
		validators: zodClient(updateAccInfoSchema),
		id: crypto.randomUUID()
	});

	const { form: formData, enhance } = form;

	const selectedGender = $derived(
		$formData.gender
			? {
					label: $formData.gender,
					value: $formData.gender
				}
			: undefined
	);

	const yearLevel = $derived(
		$formData.yearLevel
			? {
					label: $formData.yearLevel,
					value: $formData.yearLevel
				}
			: undefined
	);
</script>

<p class="p-[20px] text-center text-xl font-semibold leading-7">Update Information</p>
<form method="POST" use:enhance class="flex flex-col gap-[10px]">
	<Form.Field {form} name="firstName">
		<Form.Control let:attrs>
			<Form.Label>First Name</Form.Label>
			<Input {...attrs} bind:value={$formData.firstName} placeholder="Enter your first name" />
		</Form.Control>

		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="middleInitial">
		<Form.Control let:attrs>
			<Form.Label>Middle Initial</Form.Label>
			<Input
				{...attrs}
				bind:value={$formData.middleInitial}
				placeholder="Enter your middle initial"
			/>
		</Form.Control>

		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="lastName">
		<Form.Control let:attrs>
			<Form.Label>Last Name</Form.Label>
			<Input {...attrs} bind:value={$formData.lastName} placeholder="Enter your last name" />
		</Form.Control>

		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="nameSuffix">
		<Form.Control let:attrs>
			<Form.Label>Name Suffix (optional)</Form.Label>
			<Input {...attrs} bind:value={$formData.nameSuffix} placeholder="Enter your name suffix" />
		</Form.Control>

		<Form.FieldErrors />
	</Form.Field>

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
					<Select.Value placeholder="Select your gender" />
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
					<Select.Value placeholder="Select your year level" />
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
			<Input {...attrs} bind:value={$formData.course} placeholder="Enter your course" />
		</Form.Control>

		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="section">
		<Form.Control let:attrs>
			<Form.Label>Section</Form.Label>
			<Input {...attrs} bind:value={$formData.section} placeholder="Enter your section" />
		</Form.Control>

		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="contactNumber">
		<Form.Control let:attrs>
			<Form.Label>Contact Number (optional)</Form.Label>
			<Input
				{...attrs}
				bind:value={$formData.contactNumber}
				placeholder="Enter your contact number"
			/>
		</Form.Control>

		<Form.FieldErrors />
	</Form.Field>

	<Form.Button class="mx-auto w-full sm:w-[300px]">Update Information</Form.Button>
</form>
