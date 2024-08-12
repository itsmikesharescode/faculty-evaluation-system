<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select/index.js';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { updatePwdSchema, type UpdatePwdSchema } from '../student-manage-account-schema';
	import type { ResultModel } from '$lib/types';
	import type { User } from '@supabase/supabase-js';
	import { toast } from 'svelte-sonner';
	import { fromUserState } from '../../../_states/fromRootState.svelte';
	import { Loader } from 'lucide-svelte';

	interface Props {
		updatePwdForm: SuperValidated<Infer<UpdatePwdSchema>>;
	}

	const { updatePwdForm }: Props = $props();

	const user = fromUserState();

	const form = superForm(updatePwdForm, {
		validators: zodClient(updatePwdSchema),
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
		}
	});

	const { form: formData, enhance, submitting } = form;
</script>

<p class="p-[20px] text-center text-xl font-semibold leading-7">Update Password</p>
<form method="POST" action="?/updatePasswordEvent" use:enhance class="flex flex-col gap-[10px]">
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

	<Form.Button disabled={$submitting} class="relative mx-auto w-full sm:w-[300px]">
		{#if $submitting}
			<div class="absolute flex h-full w-full items-center justify-center rounded-lg bg-primary">
				<Loader class="h-[15px] w-[15px] animate-spin" />
			</div>
		{/if}
		Update Password
	</Form.Button>
</form>
