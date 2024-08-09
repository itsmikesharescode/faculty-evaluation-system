<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select/index.js';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { updateEmailSchema, type UpdateEmailSchema } from '../student-manage-account-schema';

	interface Props {
		updateEmailForm: SuperValidated<Infer<UpdateEmailSchema>>;
	}

	const { updateEmailForm }: Props = $props();

	const form = superForm(updateEmailForm, {
		validators: zodClient(updateEmailSchema),
		id: crypto.randomUUID()
	});

	const { form: formData, enhance } = form;
</script>

<p class="p-[20px] text-center text-xl font-semibold leading-7">Update Email</p>
<form method="POST" use:enhance class="flex flex-col gap-[10px]">
	<Form.Field {form} name="newEmail">
		<Form.Control let:attrs>
			<Form.Label>New Email</Form.Label>
			<Input {...attrs} bind:value={$formData.newEmail} placeholder="Enter your new email" />
		</Form.Control>

		<Form.FieldErrors />
	</Form.Field>

	<Form.Button class="mx-auto w-full sm:w-[300px]">Update Email</Form.Button>
</form>
