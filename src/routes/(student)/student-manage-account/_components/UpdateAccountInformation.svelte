<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select/index.js';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { updateAccInfoSchema, type UpdateAccInfoSchema } from '../student-manage-account-schema';
	import type { ResultModel } from '$lib/types';
	import { toast } from 'svelte-sonner';
	import type { User } from '@supabase/supabase-js';
	import { fromUserState } from '../../../_states/fromRootState.svelte';
	import { Loader } from 'lucide-svelte';

	interface Props {
		updateAccInfoForm: SuperValidated<Infer<UpdateAccInfoSchema>>;
	}

	const { updateAccInfoForm }: Props = $props();

	const user = fromUserState();

	const form = superForm(updateAccInfoForm, {
		validators: zodClient(updateAccInfoSchema),
		id: crypto.randomUUID(),
		invalidateAll: false,
		onUpdate({ result }) {
			const { status, data } = result as ResultModel<{ msg: string; user: User }>;

			switch (status) {
				case 200:
					toast.success('Manage Account', { description: data.msg });
					user.setUser(data.user);
					break;
				case 401:
					toast.error('Manage Account', { description: data.msg });
					break;
			}
		},
		onUpdated() {
			bindPrevValues();
		}
	});

	const { form: formData, enhance, submitting, reset } = form;

	const yearLevel = $derived(
		$formData.yearLevel
			? {
					label: $formData.yearLevel,
					value: $formData.yearLevel
				}
			: undefined
	);

	const bindPrevValues = () => {
		$formData.address = user.getUser()?.user_metadata.address;
		$formData.contactNumber = user.getUser()?.user_metadata.mobile_number;
		$formData.firstName = user.getUser()?.user_metadata.fullname.split(',')[1];
		$formData.middleInitial = user.getUser()?.user_metadata.fullname.split(',')[2];
		$formData.lastName = user.getUser()?.user_metadata.fullname.split(',')[0];
		$formData.nameSuffix = user.getUser()?.user_metadata.suffix;
		$formData.yearLevel = user.getUser()?.user_metadata.year_level;
		$formData.course = user.getUser()?.user_metadata.course;
		$formData.section = user.getUser()?.user_metadata.section;
	};

	$effect(() => {
		bindPrevValues();
	});
</script>

<p class="p-[20px] text-center text-xl font-semibold leading-7">Update Information</p>
<form method="POST" action="?/updateAccountEvent" use:enhance class="flex flex-col gap-[10px]">
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

	<Form.Field {form} name="address">
		<Form.Control let:attrs>
			<Form.Label>Address (optional)</Form.Label>
			<Input {...attrs} bind:value={$formData.address} placeholder="Enter your address" />
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
			<Input {...attrs} bind:value={$formData.nameSuffix} placeholder="Enter your name suffix" />
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

	<Form.Button disabled={$submitting} class="relative mx-auto w-full sm:w-[300px]">
		{#if $submitting}
			<div class="absolute flex h-full w-full items-center justify-center rounded-lg bg-primary">
				<Loader class="h-[15px] w-[15px] animate-spin" />
			</div>
		{/if}
		Update Information
	</Form.Button>
</form>
