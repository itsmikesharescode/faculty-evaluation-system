<script lang="ts">
	import { fromDepartmentsRouteState } from '../_states/fromAdminDepartments.svelte';
	import { fromManageAccountRouteState } from '../_states/fromAdminManageAccounts.svelte';
	import { fromQuestionnaireRouteState } from '../_states/fromAdminQuestionnaire.svelte';
	import { fromAdminRouteState } from '../_states/fromAdminRoute.svelte';
	import * as Table from '$lib/components/ui/table';
	import AdminCountCard from './_components/AdminCountCard.svelte';
	import Actions from './_components/Actions.svelte';
	import AdminLineChart from './_components/AdminLineChart.svelte';
	import AdminBarChart from './_components/AdminBarChart.svelte';

	const route = fromAdminRouteState();
	const questionnaireRoute = fromQuestionnaireRouteState();
	const departmentRoute = fromDepartmentsRouteState();
	const manageAccountRoute = fromManageAccountRouteState();

	route.setRoute('/admin-dashboard');
</script>

<div class="min-h-screen border-l-[1px] border-slate-300">
	<div class="grid gap-[0.625rem] p-[1.25rem] md:grid-cols-2">
		<div class="h-[30dvh]">
			<AdminBarChart first={5} sec={3} third={5} fourth={5} fifth={10} sixth={3} />
		</div>

		<div class="h-[30dvh]">
			<AdminLineChart first={5} sec={3} third={5} fourth={5} fifth={10} sixth={3} />
		</div>
	</div>
	<div class="mt-[1.25rem] grid gap-[1.25rem] p-[1.25rem] md:grid-cols-3">
		<AdminCountCard
			title="Total Student"
			selection="totalStudents"
			count={manageAccountRoute.getStudents()?.length ?? 0}
			link="/admin-manage-accounts"
		/>
		<AdminCountCard
			title="Total Evaluated"
			selection="totalEvaluated"
			count={40}
			link="/admin-departments"
		/>
		<AdminCountCard
			title="Total Professor"
			selection="totalProfessors"
			count={0}
			link="/admin-departments"
		/>
	</div>

	<div class="">
		<Table.Root>
			<Table.Caption>No Record</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-[3rem]"></Table.Head>
					<Table.Head class="truncate">Teacher Name</Table.Head>
					<Table.Head class="truncate">Department</Table.Head>
					<Table.Head class="truncate">Result</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each Array(10) as _}
					<Table.Row>
						<Table.Cell>
							<Actions />
						</Table.Cell>
						<Table.Cell class="truncate font-medium">DR Husay</Table.Cell>
						<Table.Cell class="truncate">BSIS</Table.Cell>
						<Table.Cell class="w-[7rem] truncate text-center">90%</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
</div>
