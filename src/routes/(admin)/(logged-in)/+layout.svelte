<script lang="ts">
	import { page } from '$app/stores';
	import { fromSupabaseClient, initSupabase } from '../../_states/fromSupabaseClient.svelte';

	import AdminNav from './_components/AdminNav.svelte';
	import { initDepartmentsRoute } from './_states/fromAdminDepartments.svelte';
	import { initQuestionnaireRoute } from './_states/fromAdminQuestionnaire.svelte';
	import { initAdminRoute } from './_states/fromAdminRoute.svelte';

	const { data, children } = $props();

	initSupabase();
	initDepartmentsRoute();
	initQuestionnaireRoute();
	initAdminRoute();

	const supabase = fromSupabaseClient();
	supabase.setClient(data.supabase);
</script>

{#if !($page.url.pathname === '/admin-login')}
	<AdminNav {children} />
{/if}

{#if !['/admin-dashboard', '/admin-manage-accounts', '/admin-departments', '/admin-questionnaire', '/admin-questionnaire/create'].includes($page.url.pathname)}
	{@render children()}
{/if}
