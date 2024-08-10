<script lang="ts">
	import { departments, fromDepartmentsRouteState } from '../_states/fromAdminDepartments.svelte';
	import { fromAdminRouteState } from '../_states/fromAdminRoute.svelte';
	import { MoveUpRight } from 'lucide-svelte';
	import AddProfessor from './_components/AddProfessor.svelte';
	import RenderProfessor from './_components/RenderProfessors.svelte';

	const route = fromAdminRouteState();
	const departmentsRoute = fromDepartmentsRouteState();
	route.setRoute('/admin-departments');
</script>

<div class="flex min-h-screen flex-col gap-[1.25rem] border-l-[1px] border-slate-300 p-[1.25rem]">
	<div
		class="sticky top-[3.3rem] flex items-center gap-[1.25rem] overflow-auto bg-secondary p-[0.625rem]"
	>
		{#each departments as department}
			<button
				onclick={() => {
					departmentsRoute.setRoute(department);
				}}
				class=" {department === departmentsRoute.getRoute() ? 'bg-primary text-white' : ''}
				flex items-center gap-[5px] p-[10px] text-black"
			>
				{department}
				<MoveUpRight class="h-[15px] w-[15px]" />
			</button>
		{/each}
	</div>

	<AddProfessor />

	<RenderProfessor />
</div>
