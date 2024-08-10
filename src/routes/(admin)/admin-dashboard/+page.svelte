<script lang="ts">
	import { fromAdminRouteState } from '../_states/fromAdminRoute.svelte';
	import AdminBarChart from './_components/AdminBarChart.svelte';
	import AdminCountCard from './_components/AdminCountCard.svelte';
	import AdminLineChart from './_components/AdminLineChart.svelte';

	const route = fromAdminRouteState();

	route.setRoute('/admin-dashboard');
</script>

<div class="min-h-screen border-l-[1px] border-slate-300">
	<div class="mt-[20px] grid gap-[20px] p-[20px] md:grid-cols-3">
		<AdminCountCard
			title="Total Student"
			selection="totalStudents"
			count={60}
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
			count={70}
			link="/admin-departments"
		/>
	</div>
</div>
