<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { adminLoginSchema, type AdminLoginSchema } from '../admin-schema';
	import type { ResultModel } from '$lib/types';
	import type { User } from '@supabase/supabase-js';
	import { toast } from 'svelte-sonner';
	import { fromUserState } from '../../../_states/fromRootState.svelte';
	import { goto } from '$app/navigation';
	import { Loader } from 'lucide-svelte';

	interface Props {
		adminLoginForm: SuperValidated<Infer<AdminLoginSchema>>;
	}

	const { adminLoginForm }: Props = $props();

	const user = fromUserState();

	const form = superForm(adminLoginForm, {
		validators: zodClient(adminLoginSchema),
		id: crypto.randomUUID(),
		invalidateAll: false,
		onUpdate({ result }) {
			const { status, data } = result as ResultModel<{ msg: string; user: User }>;

			switch (status) {
				case 200:
					toast.success('Admin Login', { description: data.msg });
					user.setUser(data.user);
					goto('/admin-dashboard');
					break;

				case 401:
					toast.error('Admin Login', { description: data.msg });
					break;
			}
		}
	});

	const { form: formData, enhance, submitting } = form;
</script>

<p class="mt-[5dvh] p-[20px] text-center text-xl font-semibold leading-7">Admin Log in</p>
<form method="POST" action="?/adminLoginEvent" use:enhance class="flex flex-col gap-[10px]">
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

	<Form.Button disabled={$submitting} class="relative w-full">
		{#if $submitting}
			<div class="absolute flex h-full w-full items-center justify-center rounded-lg bg-primary">
				<Loader class="h-[15px] w-[15px] animate-spin" />
			</div>
		{/if}
		Log in
	</Form.Button>
</form>
