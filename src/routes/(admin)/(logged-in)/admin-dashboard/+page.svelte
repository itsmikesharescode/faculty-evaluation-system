<script lang="ts">
  import { fromManageAccountRouteState } from '../_states/fromAdminManageAccounts.svelte';
  import { fromAdminRouteState } from '../_states/fromAdminRoute.svelte';
  import AdminCountCard from './_components/AdminCountCard.svelte';
  import { page } from '$app/stores';

  const route = fromAdminRouteState();

  route.setRoute('/admin-dashboard');
</script>

<div class="min-h-screen border-l-[1px] border-slate-300">
  <div class="mt-[1.25rem] grid gap-[1.25rem] p-[1.25rem] md:grid-cols-3">
    <AdminCountCard
      title="Total Student"
      selection="totalStudents"
      count={$page.data.adminLayoutQ.dashboard.total_students ?? 0}
      link="/admin-manage-accounts"
    />
    <AdminCountCard
      title="Total Evaluated"
      selection="totalEvaluated"
      count={$page.data.adminLayoutQ.dashboard.total_evaluated ?? 0}
      link="/admin-records"
    />
    <AdminCountCard
      title="Total Professor"
      selection="totalProfessors"
      count={$page.data.adminLayoutQ.dashboard.total_professor ?? 0}
      link="/admin-records"
    />
  </div>
</div>
