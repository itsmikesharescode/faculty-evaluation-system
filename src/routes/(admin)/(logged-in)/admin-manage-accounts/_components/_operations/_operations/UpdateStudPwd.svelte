<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import type { ResultModel, StudentType } from '$lib/types';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { fromManageAccountRouteState } from '../../../../_states/fromAdminManageAccounts.svelte';
	import {
		updateStudPwdSchema,
		type UpdateStudPwdSchema
	} from '../../../admin-manage-accounts-schema';
	import { toast } from 'svelte-sonner';
	import { Loader } from 'lucide-svelte';

	interface Props {
		student: StudentType;
		updateSignal: boolean;
		updateStudPwdForm: SuperValidated<Infer<UpdateStudPwdSchema>>;
	}

	let { updateSignal = $bindable(), ...props }: Props = $props();

	const manageAccountRoute = fromManageAccountRouteState();

	const form = superForm(props.updateStudPwdForm, {
		validators: zodClient(updateStudPwdSchema),
		id: crypto.randomUUID(),
		invalidateAll: false,
		onUpdate({ result }) {
			const { status, data } = result as ResultModel<{ msg: string; data: StudentType[] }>;
			switch (status) {
				case 200:
					toast.success('Update Account', { description: data.msg });
					manageAccountRoute.setStudents(data.data);
					updateSignal = false;
					break;
				case 401:
					toast.error('Update Account', { description: data.msg });
					break;
			}
		}
	});

	const { form: formData, enhance, submitting } = form;
</script>

<form
	method="POST"
	action="?/updateStudPwdEvent"
	use:enhance
	class="flex flex-col gap-[10px] overflow-auto px-[1.5rem] pb-[1.5rem]"
>
	<Form.Field {form} name="studentId" class="hidden">
		<Form.Control let:attrs>
			<Input {...attrs} value={props.student.student_id} />
		</Form.Control>
	</Form.Field>

	<div class="grid gap-[0.625rem] sm:grid-cols-2">
		<Form.Field {form} name="newPwd">
			<Form.Control let:attrs>
				<Form.Label>New Password</Form.Label>
				<div class="flex items-center gap-[0.625rem]">
					<Input
						type="password"
						{...attrs}
						bind:value={$formData.newPwd}
						placeholder="Enter student new password"
					/>
				</div>
			</Form.Control>

			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="confirmNewPwd">
			<Form.Control let:attrs>
				<Form.Label>Confirm New Password</Form.Label>
				<div class="flex items-center gap-[0.625rem]">
					<Input
						type="password"
						{...attrs}
						bind:value={$formData.confirmNewPwd}
						placeholder="Confirm student new password"
					/>
				</div>
			</Form.Control>

			<Form.FieldErrors />
		</Form.Field>
	</div>

	<div class="flex justify-end">
		<Form.Button disabled={$submitting} class="relative">
			{#if $submitting}
				<div class="absolute flex h-full w-full items-center justify-center rounded-lg bg-primary">
					<Loader class="h-[15px] w-[15px] animate-spin" />
				</div>
			{/if}
			Update Password
		</Form.Button>
	</div>
</form>
