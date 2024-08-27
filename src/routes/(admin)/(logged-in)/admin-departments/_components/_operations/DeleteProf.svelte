<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { fromDepartmentsRouteState } from '../../../_states/fromAdminDepartments.svelte';
	import { enhance } from '$app/forms';
	import type { Departments, ProfessorType, ResultModel } from '$lib/types';
	import { toast } from 'svelte-sonner';
	import { Loader } from 'lucide-svelte';

	interface Props {
		professor: ProfessorType;
		deleteSignal: boolean;
	}

	let { deleteSignal = $bindable(), professor }: Props = $props();

	const departmentRoute = fromDepartmentsRouteState();

	let deleteLoader = $state(false);
	const deleteProfEvent: SubmitFunction = () => {
		deleteLoader = true;
		return async ({ result }) => {
			const { status, data } = result as ResultModel<{ msg: string; data: Departments }>;

			switch (status) {
				case 200:
					toast.success('Delete Professor', { description: data.msg });
					deleteLoader = false;
					departmentRoute.setProfs(data.data);
					deleteSignal = false;
					break;

				case 401:
					toast.error('Delete Professor', { description: data.msg });
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
				This action cannot be undone. This will permanently delete <strong
					>{professor.fullname}</strong
				> details from our database.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer class="flex flex-col gap-[0.625rem] sm:gap-0">
			<Button
				variant="secondary"
				onclick={() => {
					deleteSignal = false;
				}}>Cancel</Button
			>
			<form method="post" action="?/deleteProfEvent" use:enhance={deleteProfEvent}>
				<input name="profId" hidden value={professor.id} />
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
