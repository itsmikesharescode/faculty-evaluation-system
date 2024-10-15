<script lang="ts">
  import '../app.css';
  import '@fontsource/poppins';
  import { invalidate, onNavigate } from '$app/navigation';
  import { fromUserState, initUser } from './_states/fromRootState.svelte';
  import { Toaster } from '$lib/components/ui/sonner';
  import Footer from '$lib/components/general/Footer.svelte';
  import { onMount } from 'svelte';

  const { data, children } = $props();

  initUser();
  const user = fromUserState();

  onMount(() => {
    const { session, supabase } = data;

    const { data: subs } = supabase.auth.onAuthStateChange((_, newSession) => {
      if (newSession?.expires_at !== session?.expires_at) {
        invalidate('supabase:auth');
      }
    });

    return () => subs.subscription.unsubscribe();
  });

  $effect(() => {
    user.setUser(data.user);
  });

  onNavigate((navigation) => {
    //@ts-ignore
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      //@ts-ignore
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
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
