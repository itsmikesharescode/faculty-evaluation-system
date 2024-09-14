<script lang="ts">
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import { Logs } from 'lucide-svelte';
  import ViewResult from './_operations/ViewResult.svelte';

  let viewSignal = $state(false);

  const handleViewing = () => (viewSignal = true);
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    <Logs class="h-[1rem] w-[1rem]" />
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.Item onclick={handleViewing}>View Results</DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>

<ViewResult bind:viewSignal />
