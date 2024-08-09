<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select/index.js';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { updatePwdSchema, type UpdatePwdSchema } from '../student-manage-account-schema';

	interface Props {
		updatePwdForm: SuperValidated<Infer<UpdatePwdSchema>>;
	}

	const { updatePwdForm }: Props = $props();

	const form = superForm(updatePwdForm, {
		validators: zodClient(updatePwdSchema),
		id: crypto.randomUUID()
	});

	const { form: formData, enhance } = form;
</script>

<p class="p-[20px] text-center text-xl font-semibold leading-7">Update Password</p>
<form method="POST" use:enhance class="flex flex-col gap-[10px]">
	<Form.Field {form} name="newPwd">
		<Form.Control let:attrs>
			<Form.Label>New Password</Form.Label>
			<Input
				type="password"
				{...attrs}
				bind:value={$formData.newPwd}
				placeholder="Enter your new password"
			/>
		</Form.Control>

		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="confirmNewPwd">
		<Form.Control let:attrs>
			<Form.Label>Confirm New Password</Form.Label>
			<Input
				type="password"
				{...attrs}
				bind:value={$formData.confirmNewPwd}
				placeholder="Confirm your new password"
			/>
		</Form.Control>

		<Form.FieldErrors />
	</Form.Field>

	<Form.Button class="mx-auto w-full sm:w-[300px]">Update Password</Form.Button>
</form>
