<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import type { ResultModel, StudentType } from '$lib/types';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { fromManageAccountRouteState } from '../../../../_states/fromAdminManageAccounts.svelte';
	import {
		updateStudEmailSchema,
		type UpdateStudEmailSchema
	} from '../../../admin-manage-accounts-schema';
	import { toast } from 'svelte-sonner';
	import { Loader } from 'lucide-svelte';

	interface Props {
		student: StudentType;
		updateSignal: boolean;
		updateStudEmailForm: SuperValidated<Infer<UpdateStudEmailSchema>>;
	}

	let { updateSignal = $bindable(), ...props }: Props = $props();

	const manageAccountRoute = fromManageAccountRouteState();

	const form = superForm(props.updateStudEmailForm, {
		validators: zodClient(updateStudEmailSchema),
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
	action="?/updateStudEmailEvent"
	use:enhance
	class="flex flex-col gap-[10px] overflow-auto px-[1.5rem] pb-[1.5rem]"
>
	<Form.Field {form} name="studentId" class="hidden">
		<Form.Control let:attrs>
			<Input {...attrs} value={props.student.student_id} />
		</Form.Control>
	</Form.Field>
	<div>
		<Form.Field {form} name="email">
			<Form.Control let:attrs>
				<Form.Label>Email</Form.Label>
				<div class="flex items-center gap-[0.625rem]">
					<Input
						{...attrs}
						bind:value={$formData.email}
						placeholder={props.student.user_meta_data.email}
					/>
					<Form.Button disabled={$submitting} class="relative">
						{#if $submitting}
							<div
								class="absolute flex h-full w-full items-center justify-center rounded-lg bg-primary"
							>
								<Loader class="h-[15px] w-[15px] animate-spin" />
							</div>
						{/if}
						Update Email
					</Form.Button>
				</div>
			</Form.Control>

			<Form.FieldErrors />
		</Form.Field>
	</div>
</form>
