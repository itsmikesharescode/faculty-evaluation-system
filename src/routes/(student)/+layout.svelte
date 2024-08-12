<script lang="ts">
	import StudentNav from './_components/StudentNav.svelte';
	import { page } from '$app/stores';
	import { initStudentRoute } from './_states/fromStudentRoute.svelte';
	import { studentPaths } from '$lib';
	import { fromSupabaseClient, initSupabase } from '../_states/fromSupabaseClient.svelte';

	const { data, children } = $props();

	initStudentRoute();
	initSupabase();

	const supabase = fromSupabaseClient();
	supabase.setClient(data.supabase);

	const navBlockedList = ['/student-login', '/student-login/update-password'];
</script>

{#if !navBlockedList.includes($page.url.pathname)}
	<StudentNav {children} />
{/if}

{#if !studentPaths.includes($page.url.pathname)}
	{@render children()}
{/if}
