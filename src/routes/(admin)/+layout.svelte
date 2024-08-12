<script lang="ts">
	import { page } from '$app/stores';
	import { initAdminRoute } from './_states/fromAdminRoute.svelte';
	import AdminNav from './_components/AdminNav.svelte';
	import { fromSupabaseClient, initSupabase } from '../_states/fromSupabaseClient.svelte';

	const { data, children } = $props();

	initAdminRoute();
	initSupabase();

	const supabase = fromSupabaseClient();
	supabase.setClient(data.supabase);
</script>

{#if !($page.url.pathname === '/admin-login')}
	<AdminNav {children} />
{/if}

{#if !['/admin-dashboard', '/admin-manage-accounts', '/admin-departments', '/admin-questionnaire', '/admin-questionnaire/create'].includes($page.url.pathname)}
	{@render children()}
{/if}
