<script lang="ts">
	import StudentNav from './_components/StudentNav.svelte';
	import { page } from '$app/stores';
	import { initStudentRoute } from './_states/fromStudentRoute.svelte';
	import { studentPaths } from '$lib';
	import { fromSupabaseClient, initSupabase } from '../../_states/fromSupabaseClient.svelte';
	import { fromDashboardRouteState, initDashboardRoute } from './_states/fromDashboardRoute.svelte';

	const { data, children } = $props();

	initStudentRoute();
	initSupabase();
	initDashboardRoute();

	const supabase = fromSupabaseClient();
	const dashboardRoute = fromDashboardRouteState();

	const navBlockedList = ['/student-login', '/student-login/update-password'];

	$effect(() => {
		supabase.setClient(data.supabase);
		dashboardRoute.setEvals(data.studentLayoutQ.data?.evaluation_forms ?? null);
		dashboardRoute.setProfs(data.studentLayoutQ.data?.professors ?? null);
	});
</script>

{#if !navBlockedList.includes($page.url.pathname)}
	<StudentNav {children} />
{/if}

{#if !studentPaths.includes($page.url.pathname)}
	{@render children()}
{/if}
