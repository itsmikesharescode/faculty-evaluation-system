<script lang="ts">
	import { enhance } from '$app/forms';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Loader } from 'lucide-svelte';
	import { fromManageAccountRouteState } from '../../../_states/fromAdminManageAccounts.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';
	import type { ResultModel, StudentType } from '$lib/types';

	interface Props {
		student: StudentType;
		deleteSignal: boolean;
	}

	let { student, deleteSignal = $bindable() }: Props = $props();

	const manageAccountRoute = fromManageAccountRouteState();

	let deleteLoader = $state(false);
	const deleteAccountEvent: SubmitFunction = () => {
		deleteLoader = true;
		return async ({ result }) => {
			const { status, data } = result as ResultModel<{ msg: string; data: StudentType[] }>;

			switch (status) {
				case 200:
					toast.success('Delete Account', { description: data.msg });
					manageAccountRoute.setStudents(data.data);
					deleteSignal = false;
					deleteLoader = false;
					break;

				case 401:
					toast.error('Delete Account', { description: data.msg });
					deleteLoader = false;
					break;
			}
		};
	};
</script>

<AlertDialog.Root bind:open={deleteSignal}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
			<AlertDialog.Description>
				This action cannot be undone. This will permanently delete {student.user_meta_data.fullname
					.split(',')
					.join(' ')} account and remove your data from our database.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<Button
				variant="secondary"
				onclick={() => {
					deleteSignal = false;
				}}
			>
				Cancel
			</Button>

			<form method="post" action="?/deleteAccountEvent" use:enhance={deleteAccountEvent}>
				<input name="studentId" hidden value={student.student_id} />
				<Button disabled={deleteLoader} type="submit" class="relative w-full sm:max-w-fit">
					{#if deleteLoader}
						<div
							class="absolute flex h-full w-full items-center justify-center rounded-lg bg-primary"
						>
							<Loader class="h-[15px] w-[15px] animate-spin" />
						</div>
					{/if}
					Continue
				</Button>
			</form>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
