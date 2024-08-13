<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { EllipsisVertical } from 'lucide-svelte';
	import { fromManageAccountRouteState } from '../../_states/fromAdminManageAccounts.svelte';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import type { UpdateStudentSchema } from '../admin-manage-accounts-schema';
	import UpdateStudent from './_operations/UpdateStudent.svelte';

	interface Props {
		updateStudentForm: SuperValidated<Infer<UpdateStudentSchema>>;
	}

	const { updateStudentForm }: Props = $props();

	const manageAccountRoute = fromManageAccountRouteState();

	let updateSignal = $state(false);
</script>

<div class="flex flex-col">
	<div
		class="sticky top-[3.3rem] grid grid-cols-[50%,40%,10%] font-semibold sm:grid-cols-[40%,20%,20%,10%,10%] md:grid-cols-[40%,20%,10%,10%,15%,5%]"
	>
		<span class="bg-secondary p-[0.625rem] text-sm">Full Name</span>
		<span class="hidden bg-secondary p-[0.625rem] text-sm md:block">ID number</span>
		<span class="hidden truncate bg-secondary p-[0.625rem] text-sm sm:block">Year Level</span>
		<span class="hidden bg-secondary p-[0.625rem] text-center text-sm sm:block">Section</span>
		<span class="bg-secondary p-[0.625rem] text-center text-sm">Course</span>
		<span class="bg-secondary p-[0.625rem] text-sm"></span>
	</div>

	{#each manageAccountRoute.getStudents() ?? [] as student}
		<div
			class="grid grid-cols-[50%,40%,10%] border-b-[1px] sm:grid-cols-[40%,20%,20%,10%,10%] md:grid-cols-[40%,20%,10%,10%,15%,5%]"
		>
			<span class="flex items-center p-[0.625rem] text-sm">{student.user_meta_data.fullname}</span>
			<span class="hidden items-center p-[0.625rem] text-sm md:flex"
				>{student.user_meta_data.id_number}</span
			>
			<span class=" hidden items-center p-[0.625rem] text-sm sm:flex"
				>{student.user_meta_data.year_level}</span
			>
			<span class="hidden items-center justify-center p-[0.625rem] text-sm sm:flex"
				>{student.user_meta_data.section}</span
			>
			<span class="flex items-center justify-center p-[0.625rem] text-sm"
				>{student.user_meta_data.course}</span
			>
			<span class="flex items-center p-[0.625rem] text-sm">
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<EllipsisVertical />
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Group>
							<DropdownMenu.Label class="flex items-center justify-center"
								>Action</DropdownMenu.Label
							>
							<DropdownMenu.Separator />
							<DropdownMenu.Item class="flex items-center justify-center">Delete</DropdownMenu.Item>
							<DropdownMenu.Item
								class="flex items-center justify-center"
								onclick={() => {
									manageAccountRoute.setActive(student);
									updateSignal = true;
								}}
							>
								Update
							</DropdownMenu.Item>
							<DropdownMenu.Item class="flex items-center justify-center md:hidden"
								>View Details</DropdownMenu.Item
							>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</span>
		</div>
	{/each}
</div>

<UpdateStudent {updateStudentForm} bind:updateSignal />
