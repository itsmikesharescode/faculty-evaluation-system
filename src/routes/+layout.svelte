<script lang="ts">
	import '../app.css';
	import '@fontsource/poppins';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	const { data, children } = $props();

	onMount(() => {
		const { session, supabase } = data;

		const { data: subs } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subs.subscription.unsubscribe();
	});
</script>

{@render children()}

<style>
	:global(html) {
		font-family: 'Poppins', sans-serif;
	}
</style>
