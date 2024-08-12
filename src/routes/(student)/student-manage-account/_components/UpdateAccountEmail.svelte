<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select/index.js';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { updateEmailSchema, type UpdateEmailSchema } from '../student-manage-account-schema';
	import type { ResultModel } from '$lib/types';
	import type { User } from '@supabase/supabase-js';
	import { toast } from 'svelte-sonner';
	import { fromUserState } from '../../../_states/fromRootState.svelte';
	import { Loader } from 'lucide-svelte';

	interface Props {
		updateEmailForm: SuperValidated<Infer<UpdateEmailSchema>>;
	}

	const { updateEmailForm }: Props = $props();

	const user = fromUserState();

	const form = superForm(updateEmailForm, {
		validators: zodClient(updateEmailSchema),
		id: crypto.randomUUID(),
		invalidateAll: false,
		onUpdate({ result }) {
			const { data, status } = result as ResultModel<{ msg: string; user: User }>;

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

<p class="p-[20px] text-center text-xl font-semibold leading-7">Update Email</p>
<form method="POST" action="?/updateEmailEvent" use:enhance class="flex flex-col gap-[10px]">
	<Form.Field {form} name="newEmail">
		<Form.Control let:attrs>
			<Form.Label>New Email</Form.Label>
			<Input {...attrs} bind:value={$formData.newEmail} placeholder="Enter your new email" />
		</Form.Control>

		<Form.FieldErrors />
	</Form.Field>

	<Form.Button disabled={$submitting} class="relative mx-auto w-full sm:w-[300px]">
		{#if $submitting}
			<div class="absolute flex h-full w-full items-center justify-center rounded-lg bg-primary">
				<Loader class="h-[15px] w-[15px] animate-spin" />
			</div>
		{/if}
		Update Email
	</Form.Button>
</form>
