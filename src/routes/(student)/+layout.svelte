<script lang="ts">
	import StudentNav from './components/StudentNav.svelte';
	import { page } from '$app/stores';

	const { children } = $props();
</script>

{#if !($page.url.pathname === '/student-login')}
	<StudentNav {children} />
{/if}

{#if !['/student-dashboard', '/student-manage-account', '/student-dashboard/evaluationform'].includes($page.url.pathname)}
	{@render children()}
{/if}
