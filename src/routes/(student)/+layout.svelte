<script lang="ts">
	import StudentNav from './_components/StudentNav.svelte';
	import { page } from '$app/stores';
	import { initStudentRoute } from './_states/fromStudentRoute.svelte';

	const { children } = $props();

	initStudentRoute();
</script>

{#if !($page.url.pathname === '/student-login')}
	<StudentNav {children} />
{/if}

{#if !['/student-dashboard', '/student-manage-account', '/student-dashboard/evaluationform'].includes($page.url.pathname)}
	{@render children()}
{/if}
