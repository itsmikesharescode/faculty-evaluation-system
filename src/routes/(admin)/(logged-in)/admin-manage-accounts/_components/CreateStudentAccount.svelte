<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { X } from 'lucide-svelte';
	import * as Select from '$lib/components/ui/select/index.js';
	import { createStudentSchema, type CreateStudentSchema } from '../admin-manage-accounts-schema';

	interface Props {
		createStudentForm: SuperValidated<Infer<CreateStudentSchema>>;
	}

	const { createStudentForm }: Props = $props();

	let open = $state(false);

	const form = superForm(createStudentForm, {
		validators: zodClient(createStudentSchema),
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

<Button onclick={() => (open = true)} class="max-w-fit">Create Student Account</Button>

<AlertDialog.Root bind:open>
	<AlertDialog.Content class="flex max-h-screen flex-col p-0">
		<button
			onclick={() => (open = false)}
			class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
		>
			<X class="h-4 w-4" />
			<span class="sr-only">Close</span>
		</button>
		<AlertDialog.Header class="p-[1.5rem]">
			<AlertDialog.Title>Create Student Account</AlertDialog.Title>
			<AlertDialog.Description>
				Answer the following field to create student account.
			</AlertDialog.Description>
		</AlertDialog.Header>

		<form
			method="POST"
			use:enhance
			class="flex flex-col gap-[10px] overflow-auto px-[1.5rem] pb-[1.5rem]"
		>
			<Form.Field {form} name="idNumber">
				<Form.Control let:attrs>
					<Form.Label>ID Number</Form.Label>
					<Input {...attrs} bind:value={$formData.idNumber} placeholder="Enter your id number" />
				</Form.Control>

				<Form.FieldErrors />
			</Form.Field>

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
					<Input
						{...attrs}
						bind:value={$formData.nameSuffix}
						placeholder="Enter your name suffix"
					/>
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

			<Form.Field {form} name="password">
				<Form.Control let:attrs>
					<Form.Label>Password</Form.Label>
					<Input
						type="password"
						{...attrs}
						bind:value={$formData.password}
						placeholder="Enter your password"
					/>
				</Form.Control>

				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="confirmPassword">
				<Form.Control let:attrs>
					<Form.Label>Confirm Password</Form.Label>
					<Input
						type="password"
						{...attrs}
						bind:value={$formData.confirmPassword}
						placeholder="Confirm your password"
					/>
				</Form.Control>

				<Form.FieldErrors />
			</Form.Field>

			<div class="flex justify-end">
				<Form.Button class="">Create</Form.Button>
			</div>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>
