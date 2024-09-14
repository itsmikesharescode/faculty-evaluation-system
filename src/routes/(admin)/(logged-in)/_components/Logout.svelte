<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import { LogOut } from 'lucide-svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import { toast } from 'svelte-sonner';
  import { goto } from '$app/navigation';
  import { fromSupabaseClient } from '../../../_states/fromSupabaseClient.svelte';

  interface Props {
    showLogout: boolean;
  }

  let { showLogout = $bindable() }: Props = $props();

  const supabase = fromSupabaseClient();

  let logoutLoader = $state(false);
</script>

<AlertDialog.Root bind:open={showLogout}>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title class="flex items-center gap-[10px]">
        <LogOut />
        Log out
      </AlertDialog.Title>
      <AlertDialog.Description>
        You are about to log out from the ProfEval System.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
      <Button
        disabled={logoutLoader}
        onclick={async () => {
          const logout = supabase.getClient()?.auth.signOut();
          logoutLoader = true;
          if (logout) {
            const { error } = await logout;

            if (error) toast.error('Log out', { description: error.message });
            else {
              toast.success('Log out', { description: 'Thank you come back again!' });
              goto('/');
            }
          }
        }}>{logoutLoader ? 'Logging out...' : 'Log out'}</Button
      >
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
