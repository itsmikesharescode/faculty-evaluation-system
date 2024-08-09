<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { studentLoginSchema, type StudentLoginSchema } from '../student-schema';
	import { zodClient } from 'sveltekit-superforms/adapters';

	interface Props {
		studentLoginForm: SuperValidated<Infer<StudentLoginSchema>>;
	}

	const { studentLoginForm }: Props = $props();

	const form = superForm(studentLoginForm, {
		validators: zodClient(studentLoginSchema),
		id: crypto.randomUUID()
	});

	const { form: formData, enhance } = form;
</script>

<p class="mt-[5dvh] p-[20px] text-center text-xl font-semibold leading-7">Student Log in</p>
<form method="POST" use:enhance class="flex flex-col gap-[10px]">
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>Student Email</Form.Label>
			<Input {...attrs} bind:value={$formData.email} placeholder="Enter your email" />
		</Form.Control>

		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="password">
		<Form.Control let:attrs>
			<Form.Label>Student Password</Form.Label>
			<Input
				type="password"
				{...attrs}
				bind:value={$formData.password}
				placeholder="Enter your password"
			/>
		</Form.Control>

		<Form.FieldErrors />
	</Form.Field>

	<Form.Button class="w-full">Log in</Form.Button>

	<div class=" mt-[20px] flex flex-col gap-[10px]">
		<a
			href="/student-login?k=forgot-password"
			class="mx-auto max-w-fit text-sm transition-all hover:underline">Forgot Password?</a
		>
		<a
			href="/student-login?k=create-account"
			class="mx-auto max-w-fit text-sm transition-all hover:underline">Create Account</a
		>
	</div>
</form>
