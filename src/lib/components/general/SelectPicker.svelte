<script lang="ts">
  import * as Select from '$lib/components/ui/select/index.js';

  interface Props {
    selections: {
      value: string;
      label: string;
    }[];
    selected: string;
    placeholder?: string;
    onValueChange?: (v: string) => string;
    hasDescription?: boolean;
  }

  let {
    selected = $bindable(),
    selections,
    placeholder = 'Select item',
    onValueChange,
    hasDescription = false
  }: Props = $props();

  const selectedValue = $derived(selections.find((item) => item.value === selected));
</script>

<Select.Root type="single" {onValueChange}>
  <Select.Trigger>
    {selectedValue ? selectedValue.label : placeholder}
  </Select.Trigger>
  <Select.Content>
    {#each selections as selection}
      <Select.Item value={selection.value}>
        {#if hasDescription}
          <span>{selection.label}</span>
          <span>{selection.value}</span>
        {:else}
          <span>{selection.label}</span>
        {/if}
      </Select.Item>
    {/each}
  </Select.Content>
</Select.Root>
