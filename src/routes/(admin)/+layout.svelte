<script lang="ts">
	import { page } from '$app/stores';
	import { initAdminRoute } from './_states/fromAdminRoute.svelte';
	import AdminNav from './_components/AdminNav.svelte';

	const { children } = $props();

	initAdminRoute();
</script>

{#if !($page.url.pathname === '/admin-login')}
	<AdminNav {children} />
{/if}

{#if !['/admin-dashboard', '/admin-manage-accounts', '/admin-departments'].includes($page.url.pathname)}
	{@render children()}
{/if}
