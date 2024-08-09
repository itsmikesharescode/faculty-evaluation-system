<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { studentForgotPwdSchema, type StudentForgotPwdSchema } from '../student-schema';
	import { zodClient } from 'sveltekit-superforms/adapters';

	interface Props {
		studentForgotPwdForm: SuperValidated<Infer<StudentForgotPwdSchema>>;
	}

	const { studentForgotPwdForm }: Props = $props();

	const form = superForm(studentForgotPwdForm, {
		validators: zodClient(studentForgotPwdSchema),
		id: crypto.randomUUID()
	});

	const { form: formData, enhance } = form;
</script>

<p class="mt-[5dvh] p-[20px] text-center text-xl font-semibold leading-7">Forgot Password</p>
<form method="POST" use:enhance class="flex flex-col gap-[10px]">
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>Student Email</Form.Label>
			<Input {...attrs} bind:value={$formData.email} placeholder="Enter your email" />
		</Form.Control>

		<Form.FieldErrors />
	</Form.Field>

	<Form.Button class="w-full">Reset Password</Form.Button>

	<div class=" mt-[20px] flex flex-col gap-[10px]">
		<a href="/student-login" class="mx-auto max-w-fit text-sm transition-all hover:underline"
			>Log in here</a
		>
	</div>
</form>
