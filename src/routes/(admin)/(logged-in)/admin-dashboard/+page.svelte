<script lang="ts">
  import { fromDepartmentsRouteState } from '../_states/fromAdminDepartments.svelte';
  import { fromManageAccountRouteState } from '../_states/fromAdminManageAccounts.svelte';
  import { fromQuestionnaireRouteState } from '../_states/fromAdminQuestionnaire.svelte';
  import { fromAdminRouteState } from '../_states/fromAdminRoute.svelte';
  import AdminCountCard from './_components/AdminCountCard.svelte';
  import AdminLineChart from './_components/AdminLineChart.svelte';
  import AdminBarChart from './_components/AdminBarChart.svelte';

  const { data } = $props();

  const route = fromAdminRouteState();
  const manageAccountRoute = fromManageAccountRouteState();

  route.setRoute('/admin-dashboard');
</script>

<div class="min-h-screen border-l-[1px] border-slate-300">
  <!-- <div class="grid gap-[0.625rem] p-[1.25rem] md:grid-cols-2">
		<div class="h-[30dvh]">
			<AdminBarChart first={5} sec={3} third={5} fourth={5} fifth={10} sixth={3} />
		</div>

		<div class="h-[30dvh]">
			<AdminLineChart first={5} sec={3} third={5} fourth={5} fifth={10} sixth={3} />
		</div>
	</div> -->
  <div class="mt-[1.25rem] grid gap-[1.25rem] p-[1.25rem] md:grid-cols-3">
    <AdminCountCard
      title="Total Student"
      selection="totalStudents"
      count={data.adminLayoutQ.data?.dashboard.total_students ?? 0}
      link="/admin-manage-accounts"
    />
    <AdminCountCard
      title="Total Evaluated"
      selection="totalEvaluated"
      count={data.adminLayoutQ.data?.dashboard.total_evaluated ?? 0}
      link="/admin-departments"
    />
    <AdminCountCard
      title="Total Professor"
      selection="totalProfessors"
      count={data.adminLayoutQ.data?.dashboard.total_professor ?? 0}
      link="/admin-departments"
    />
  </div>
</div>
