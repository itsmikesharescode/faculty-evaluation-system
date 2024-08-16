<script lang="ts">
	import '../app.css';
	import '@fontsource/poppins';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { fromUserState, initUser } from './_states/fromRootState.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import Footer from '$lib/components/general/Footer.svelte';

	const { data, children } = $props();

	initUser();
	const user = fromUserState();
	user.setUser(data.user);

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

<Toaster richColors={true} />
{@render children()}

<Footer />

<style>
	:global(html) {
		font-family: 'Poppins', sans-serif;
	}
</style>
