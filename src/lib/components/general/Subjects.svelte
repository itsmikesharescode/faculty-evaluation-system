<script lang="ts">
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import type { ProfessorType } from '$lib/types';
  import { ChevronDown } from 'lucide-svelte';

  interface Props {
    subjects: string[];
  }

  const { subjects }: Props = $props();
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger class="flex items-center gap-[0.31rem] text-sm">
    View subjects <ChevronDown class="h-[15px] w-[15px]" />
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="w-[300px]">
    <DropdownMenu.Group class="flex flex-col p-[10px]">
      <div class="flex max-h-[18rem] flex-col gap-4 overflow-auto">
        {#each subjects as section, index}
          <p>{section}</p>
        {/each}
      </div>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
