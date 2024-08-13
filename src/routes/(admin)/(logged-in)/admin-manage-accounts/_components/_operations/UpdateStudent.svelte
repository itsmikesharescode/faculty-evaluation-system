<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Loader, X } from 'lucide-svelte';
	import * as Select from '$lib/components/ui/select/index.js';
	import type { ResultModel, StudentType } from '$lib/types';
	import { toast } from 'svelte-sonner';
	import { fromManageAccountRouteState } from '../../../_states/fromAdminManageAccounts.svelte';
	import {
		updateStudentSchema,
		type UpdateStudentSchema
	} from '../../admin-manage-accounts-schema';

	interface Props {
		updateStudentForm: SuperValidated<Infer<UpdateStudentSchema>>;
		updateSignal: boolean;
	}

	let { updateStudentForm, updateSignal = $bindable() }: Props = $props();

	const manageAccountRoute = fromManageAccountRouteState();

	const form = superForm(updateStudentForm, {
		validators: zodClient(updateStudentSchema),
		id: crypto.randomUUID(),
		invalidateAll: false,
		onUpdate({ result }) {
			const { status, data } = result as ResultModel<{ msg: string; data: StudentType[] }>;
			switch (status) {
				case 200:
					toast.success('Create Account', { description: data.msg });
					manageAccountRoute.setStudents(data.data);
					manageAccountRoute.setActive(null);
					updateSignal = false;
					break;
				case 401:
					toast.error('Create Account', { description: data.msg });
					break;
			}
		}
	});

	const { form: formData, enhance, submitting } = form;

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

	const loadPrevData = () => {
		$formData.idNumber = manageAccountRoute.getActive()?.user_meta_data.id_number ?? '';
		$formData.email = manageAccountRoute.getActive()?.user_meta_data.email ?? '';
		$formData.firstName =
			manageAccountRoute.getActive()?.user_meta_data.fullname.split(',')[1] ?? '';
		$formData.middleInitial =
			manageAccountRoute.getActive()?.user_meta_data.fullname.split(',')[2] ?? '';
		$formData.lastName =
			manageAccountRoute.getActive()?.user_meta_data.fullname.split(',')[0] ?? '';
		$formData.nameSuffix = manageAccountRoute.getActive()?.user_meta_data.suffix ?? '';
		$formData.gender = manageAccountRoute.getActive()?.user_meta_data.gender ?? '';
		$formData.yearLevel = manageAccountRoute.getActive()?.user_meta_data.year_level ?? '';
		$formData.course = manageAccountRoute.getActive()?.user_meta_data.course ?? '';
		$formData.section = manageAccountRoute.getActive()?.user_meta_data.section ?? '';
	};

	$effect(() => {
		loadPrevData();
	});
</script>

<AlertDialog.Root bind:open={updateSignal}>
	<AlertDialog.Content class="flex max-h-screen max-w-[800px] flex-col p-0">
		<button
			onclick={() => {
				manageAccountRoute.setActive(null);
				updateSignal = false;
			}}
			class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
		>
			<X class="h-4 w-4" />
			<span class="sr-only">Close</span>
		</button>
		<AlertDialog.Header class="p-[1.5rem]">
			<AlertDialog.Title>Update Student Account</AlertDialog.Title>
			<AlertDialog.Description>
				Answer the following field to update student account.
			</AlertDialog.Description>
		</AlertDialog.Header>

		<form
			method="POST"
			action="?/createStudentAccEvent"
			use:enhance
			class="flex flex-col gap-[10px] overflow-auto px-[1.5rem] pb-[1.5rem]"
		>
			<div class="grid gap-[0.625rem] sm:grid-cols-2">
				<div>
					<Form.Field {form} name="idNumber">
						<Form.Control let:attrs>
							<Form.Label>ID Number</Form.Label>
							<Input
								{...attrs}
								bind:value={$formData.idNumber}
								placeholder="Enter student id number"
							/>
						</Form.Control>

						<Form.FieldErrors />
					</Form.Field>

					<Form.Field {form} name="email">
						<Form.Control let:attrs>
							<Form.Label>Email</Form.Label>
							<Input {...attrs} bind:value={$formData.email} placeholder="Enter student email" />
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
							<Input
								{...attrs}
								bind:value={$formData.lastName}
								placeholder="Enter student last name"
							/>
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
							<Input {...attrs} bind:value={$formData.course} placeholder="Enter student course" />
						</Form.Control>

						<Form.FieldErrors />
					</Form.Field>

					<Form.Field {form} name="section">
						<Form.Control let:attrs>
							<Form.Label>Section</Form.Label>
							<Input
								{...attrs}
								bind:value={$formData.section}
								placeholder="Enter student section"
							/>
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
								placeholder="Enter student password"
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
								placeholder="Confirm student password"
							/>
						</Form.Control>

						<Form.FieldErrors />
					</Form.Field>
				</div>
			</div>
			<Form.Field {form} name="student_id">
				<Form.Control let:attrs>
					<Input {...attrs} value={manageAccountRoute.getActive()?.student_id} class="hidden" />
				</Form.Control>

				<Form.FieldErrors />
			</Form.Field>
			<div class=" flex justify-end">
				<Form.Button class="relative">
					{#if $submitting}
						<div
							class="absolute flex h-full w-full items-center justify-center rounded-lg bg-primary"
						>
							<Loader class="h-[15px] w-[15px] animate-spin" />
						</div>
					{/if}
					Update Account
				</Form.Button>
			</div>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>
