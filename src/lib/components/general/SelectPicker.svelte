<script lang="ts">
  import * as Select from '$lib/components/ui/select/index.js';
  import Label from '../ui/label/label.svelte';

  interface Props {
    selections: {
      value: string;
      label: string;
    }[];
    selected: string;
    placeholder?: string;
    hasDescription?: boolean;
  }

  let {
    selected = $bindable(),
    selections,
    placeholder = 'Select item',
    hasDescription = false
  }: Props = $props();
  let value = $state(selected);
  let selectedValue = $derived(selections.find((item) => item.value === selected));
</script>

<Select.Root
  type="single"
  onValueChange={(v) => {
    selected = v;
  }}
  bind:value
>
  <Select.Trigger>
    <span class={selectedValue ? 'text-black' : 'text-muted-foreground'}
      >{selectedValue?.label || placeholder}</span
    >
  </Select.Trigger>
  <Select.Content>
    {#each selections as selection}
      <Select.Item value={selection.value}>
        <div class="flex flex-col">
          {#if hasDescription}
            <span>{selection.value}</span>
            <span class="text-muted-foreground">{selection.label}</span>
          {:else}
            <span>{selection.label}</span>
          {/if}
        </div>
      </Select.Item>
    {/each}
  </Select.Content>
</Select.Root>
