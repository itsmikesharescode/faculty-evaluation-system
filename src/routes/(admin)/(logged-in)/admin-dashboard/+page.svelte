<script lang="ts">
	import { fromDepartmentsRouteState } from '../_states/fromAdminDepartments.svelte';
	import { fromManageAccountRouteState } from '../_states/fromAdminManageAccounts.svelte';
	import { fromQuestionnaireRouteState } from '../_states/fromAdminQuestionnaire.svelte';
	import { fromAdminRouteState } from '../_states/fromAdminRoute.svelte';
	import AdminCountCard from './_components/AdminCountCard.svelte';

	const route = fromAdminRouteState();
	const questionnaireRoute = fromQuestionnaireRouteState();
	const departmentRoute = fromDepartmentsRouteState();
	const manageAccountRoute = fromManageAccountRouteState();

	route.setRoute('/admin-dashboard');
</script>

<div class="min-h-screen border-l-[1px] border-slate-300">
	<div class="mt-[20px] grid gap-[20px] p-[20px] md:grid-cols-3">
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
			count={departmentRoute.getProfs()?.length ?? 0}
			link="/admin-departments"
		/>
	</div>
</div>
