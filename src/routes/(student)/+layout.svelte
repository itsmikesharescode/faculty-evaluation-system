<script lang="ts">
	import StudentNav from './_components/StudentNav.svelte';
	import { page } from '$app/stores';
	import { initStudentRoute } from './_states/fromStudentRoute.svelte';
	import { studentPaths } from '$lib';

	const { children } = $props();

	initStudentRoute();

	const navBlockedList = ['/student-login', '/student-login/update-password'];
</script>

{#if !navBlockedList.includes($page.url.pathname)}
	<StudentNav {children} />
{/if}

{#if !studentPaths.includes($page.url.pathname)}
	{@render children()}
{/if}
