<script lang="ts">
  import { EllipsisVertical } from 'lucide-svelte';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import type { EvaluationType } from '$lib/types';
  import UseEvaluation from './_operations/UseEvaluation.svelte';
  import ViewEvaluation from './_operations/ViewEvaluation.svelte';
  import DeleteEvaluation from './_operations/DeleteEvaluation.svelte';

  interface Props {
    evalForm: EvaluationType;
  }

  const { ...props }: Props = $props();

  let useSignal = $state(false);
  let viewSignal = $state(false);
  let deleteSignal = $state(false);
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    <EllipsisVertical />
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.Item
        class="flex items-center justify-center"
        onclick={() => {
          useSignal = true;
        }}
      >
        Use
      </DropdownMenu.Item>
      <DropdownMenu.Item
        class="flex items-center justify-center"
        onclick={() => {
          viewSignal = true;
        }}
      >
        View
      </DropdownMenu.Item>
      <DropdownMenu.Item
        class="flex items-center justify-center"
        onclick={() => {
          deleteSignal = true;
        }}
      >
        Delete
      </DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>

<UseEvaluation bind:useSignal evalForm={props.evalForm} />
<ViewEvaluation bind:viewSignal evalForm={props.evalForm} />
<DeleteEvaluation bind:deleteSignal evalForm={props.evalForm} />
