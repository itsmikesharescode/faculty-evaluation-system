<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { adminLoginSchema, type AdminLoginSchema } from '../admin-schema';

	interface Props {
		adminLoginForm: SuperValidated<Infer<AdminLoginSchema>>;
	}

	const { adminLoginForm }: Props = $props();

	const form = superForm(adminLoginForm, {
		validators: zodClient(adminLoginSchema),
		id: crypto.randomUUID()
	});

	const { form: formData, enhance } = form;
</script>

<p class="mt-[5dvh] p-[20px] text-center text-xl font-semibold leading-7">Admin Log in</p>
<form method="POST" use:enhance class="flex flex-col gap-[10px]">
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>Admin Email</Form.Label>
			<Input {...attrs} bind:value={$formData.email} placeholder="Enter your email" />
		</Form.Control>

		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="password">
		<Form.Control let:attrs>
			<Form.Label>Admin Password</Form.Label>
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
</form>
