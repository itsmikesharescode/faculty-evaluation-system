<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import type { EvaluatedType } from '$lib/types';
  import { X } from 'lucide-svelte';

  interface Props {
    viewSignal: boolean;
    professor: EvaluatedType;
  }

  let { viewSignal = $bindable(), ...props }: Props = $props();

  const handleCloseViewing = () => (viewSignal = false);
</script>

<AlertDialog.Root bind:open={viewSignal}>
  <AlertDialog.Content class="flex max-h-screen max-w-[700px] flex-col gap-[0.625rem]">
    <button
      onclick={handleCloseViewing}
      class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
    >
      <X class="h-4 w-4" />
      <span class="sr-only">Close</span>
    </button>

    <AlertDialog.Header>
      <AlertDialog.Title>Viewing Result</AlertDialog.Title>
      <AlertDialog.Description>
        You are viewing evaluation results for <strong>{props.professor.fullname}</strong>
      </AlertDialog.Description>
    </AlertDialog.Header>

    <div class="flex flex-col gap-[0.625rem] overflow-auto">
      {#each props.professor.answers_copy as result}
        <p class="text-sm">{result.headerTitle}</p>
        <div class="">
          <p class="text-sm text-muted-foreground">Total Question: {result.length}</p>
          <p class="text-sm text-muted-foreground">Total Score: {result.sum}</p>
          <p class="text-sm text-muted-foreground">
            Percentage: <strong>{result.percentage.toFixed(0)} %</strong>
          </p>
        </div>
      {/each}
    </div>

    <div class="flex justify-end p-[0.625rem]">
      <p class="text-sm font-semibold">
        Net Percentage: {(
          props.professor.answers_copy
            .map((item) => item.percentage)
            .reduce((acc, curr) => acc + curr) / props.professor.answers_copy.length
        ).toFixed(0)} %
      </p>
    </div>
  </AlertDialog.Content>
</AlertDialog.Root>
