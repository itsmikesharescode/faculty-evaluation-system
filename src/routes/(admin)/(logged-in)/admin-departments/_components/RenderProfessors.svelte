<script lang="ts">
	import Section from './_render_professor_component/Section.svelte';
	import { EllipsisVertical } from 'lucide-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import DeleteProfessor from './_render_professor_component/_operations/DeleteProfessor.svelte';
	import { fromDepartmentsRouteState } from '../../_states/fromAdminDepartments.svelte';

	let deleteSignal = $state(false);

	const departmentRoute = fromDepartmentsRouteState();
</script>

<div class="">
	<!--Table Header-->
	<div
		class="sticky top-[7rem] grid grid-cols-[70%,20%,10%] border-black bg-secondary text-sm font-semibold lg:grid-cols-[60%,20%,10%,10%]"
	>
		<span class=" p-[0.625rem]">Professor Name</span>
		<span class="hidden p-[0.625rem] text-center lg:block">Section</span>
		<span class="p-[0.625rem] text-center">Result</span>
		<span class="  p-[0.625rem] text-center"></span>
	</div>

	<!--Table Data-->
	{#each Array(30) as _, index}
		<div
			class="grid grid-cols-[70%,20%,10%] border-b-[1px] border-black text-sm lg:grid-cols-[60%,20%,10%,10%]"
		>
			<span class="flex items-center p-[0.625rem]">Lesley Marksman</span>
			<span class="hidden items-center justify-center p-[0.625rem] lg:flex"><Section /></span>
			<span class="flex items-center justify-center p-[0.625rem] text-center">70%</span>
			<span class="flex items-center justify-end p-[0.625rem]">
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<EllipsisVertical />
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Group>
							<DropdownMenu.Label class="flex items-center justify-center"
								>Actions</DropdownMenu.Label
							>
							<DropdownMenu.Separator />
							<DropdownMenu.Item
								class="flex items-center justify-center"
								onclick={() => {
									deleteSignal = true;
								}}>Delete</DropdownMenu.Item
							>
							<DropdownMenu.Item class="flex items-center justify-center">Update</DropdownMenu.Item>

							<div class="lg:hidden">
								<Section />
							</div>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</span>
		</div>
	{/each}
</div>

<!--Operations-->
<DeleteProfessor bind:deleteSignal />
