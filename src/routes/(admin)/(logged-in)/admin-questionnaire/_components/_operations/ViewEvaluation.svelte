<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import { X, Loader } from 'lucide-svelte';
  import AdminCustomRadio from '../AdminCustomRadio.svelte';
  import type { EvaluationType } from '$lib/types';
  import Button from '$lib/components/ui/button/button.svelte';
  import Label from '$lib/components/ui/label/label.svelte';
  import Input from '$lib/components/ui/input/input.svelte';
  import { fromSupabaseClient } from '../../../../../_states/fromSupabaseClient.svelte';
  import { toast } from 'svelte-sonner';
  import MessageCircle from 'lucide-svelte/icons/message-circle';

  interface Props {
    viewSignal: boolean;
    evalForm: EvaluationType;
  }

  let { viewSignal = $bindable(), ...props }: Props = $props();

  let showUpdateStatue = $state(false);

  const supabase = fromSupabaseClient();

  console.log($state.snapshot(props.evalForm));

  let updateLoader = $state(false);
  const handleUpdate = async () => {
    const sb = supabase.getClient();
    updateLoader = true;
    if (sb) {
      const { error } = await sb
        .from('evaluation_list_tb')
        .update([
          {
            evaluation_data: props.evalForm.evaluation_data
          }
        ])
        .eq('id', props.evalForm.id);

      if (error) {
        showUpdateStatue = false;
        updateLoader = false;
        return toast.error('', { description: error.message });
      }
      showUpdateStatue = false;
      updateLoader = false;
      return toast.success('', { description: 'Evaluation updated.' });
    }
  };
</script>

<AlertDialog.Root bind:open={viewSignal}>
  <AlertDialog.Content class="flex h-screen max-w-full flex-col gap-[1.25rem] p-0">
    <button
      onclick={() => {
        viewSignal = false;
      }}
      class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
    >
      <X class="h-4 w-4" />
      <span class="sr-only">Close</span>
    </button>

    <AlertDialog.Header class="px-[2rem] pt-[2rem]">
      <AlertDialog.Title>
        <strong class="text-muted-foreground">You are viewing</strong>
        {#if showUpdateStatue}
          <div class="flex w-full max-w-3xl flex-col gap-1.5">
            <Label for="headerTitle">Evaluation Title</Label>
            <Input
              type="headerTitle"
              id="headerTitle"
              placeholder="Enter new header title"
              bind:value={props.evalForm.evaluation_data.evalTitle}
            />
          </div>
        {:else}
          {props.evalForm.evaluation_data.evalTitle}
        {/if}
      </AlertDialog.Title>
      <AlertDialog.Description>
        Thoroughly reviewing an evaluation form can help identify and rectify potential errors
        before proceeding to production.
      </AlertDialog.Description>
    </AlertDialog.Header>

    <div class="overflow-auto p-[2rem] pt-0">
      {#each props.evalForm.evaluation_data.headers ?? [] as evaluationForm, index}
        <div>
          <div class="">
            {#if showUpdateStatue}
              <div class="flex w-full max-w-3xl flex-col gap-1.5">
                <Label for="headerTitle">Header Title {index + 1}</Label>
                <Input
                  type="headerTitle"
                  id="headerTitle"
                  placeholder="Enter new header title"
                  bind:value={evaluationForm.headerTitle}
                />
              </div>
            {:else}
              <p class="text-xl font-semibold text-primary">{evaluationForm.headerTitle}</p>
              <div class="h-[0.25rem] w-[1.875rem] bg-yellow-500"></div>
            {/if}
          </div>

          <div class="flex flex-col gap-[1rem] p-[0.625rem]">
            {#each evaluationForm.questions as questionObj, innerIndex}
              {#if showUpdateStatue}
                <div class="flex w-full max-w-3xl flex-col gap-1.5">
                  <Label for="headerTitle">Question {innerIndex + 1}</Label>
                  <Input
                    type="headerTitle"
                    id={questionObj.id}
                    placeholder="Enter new header title"
                    bind:value={questionObj.question}
                  />
                </div>
              {:else}
                <AdminCustomRadio {questionObj} index={innerIndex} />
              {/if}
            {/each}
          </div>
        </div>
      {/each}

      {#if showUpdateStatue}
        <div class="flex w-full max-w-3xl flex-col gap-1.5">
          <Label for="headerTitle">Comment Title</Label>
          <Input
            type="headerTitle"
            id="headerTitle"
            placeholder="Enter new header title"
            bind:value={props.evalForm.evaluation_data.remark.title}
          />
        </div>
      {:else}
        <p class="flex items-center gap-2.5 text-xl font-semibold text-primary">
          {props.evalForm.evaluation_data.remark.title}
          <MessageCircle />
        </p>
        <div class="h-[0.25rem] w-[1.875rem] bg-yellow-500"></div>
      {/if}
    </div>

    <div class="flex justify-end gap-[0.5rem] p-2">
      <Button
        variant={showUpdateStatue ? 'destructive' : 'default'}
        onclick={() => (showUpdateStatue = !showUpdateStatue)}
      >
        {showUpdateStatue ? 'Cancel' : 'Update Evaluation'}
      </Button>
      {#if showUpdateStatue}
        <Button disabled={updateLoader} onclick={handleUpdate} class="relative">
          {#if updateLoader}
            <div
              class="absolute flex h-full w-full items-center justify-center rounded-lg bg-primary"
            >
              <Loader class="h-[15px] w-[15px] animate-spin" />
            </div>
          {/if}
          Update
        </Button>
      {/if}
    </div>
  </AlertDialog.Content>
</AlertDialog.Root>
