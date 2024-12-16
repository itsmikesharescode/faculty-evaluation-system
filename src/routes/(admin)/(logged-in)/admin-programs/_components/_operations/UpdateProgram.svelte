<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { Loader, X } from 'lucide-svelte';
  import type { ResultModel, StudentType } from '$lib/types';
  import { toast } from 'svelte-sonner';
  import { updateProgramSchema, type UpdateProgramSchema } from '../../admin-programs-schema';

  interface Props {
    updateSignal: boolean;
    updateProgramForm: SuperValidated<Infer<UpdateProgramSchema>>;
  }

  let { updateSignal = $bindable(), updateProgramForm }: Props = $props();

  const form = superForm(updateProgramForm, {
    validators: zodClient(updateProgramSchema),
    id: crypto.randomUUID(),
    onUpdate({ result }) {
      const { status, data } = result as ResultModel<{ msg: string; data: StudentType[] }>;
      switch (status) {
        case 200:
          toast.success('Update Program', { description: data.msg });
          updateSignal = false;
          break;
        case 401:
          toast.error('Update Program', { description: data.msg });
          break;
      }
    }
  });

  const { form: formData, enhance, submitting } = form;

  $effect(() => {
    if (updateSignal) {
      $formData.id = 0;
      $formData.name = '';
      $formData.code = '';
    }
  });
</script>

<AlertDialog.Root bind:open={updateSignal}>
  <AlertDialog.Content class="flex max-h-screen flex-col p-0">
    <button
      onclick={() => {
        updateSignal = false;
        form.reset();
      }}
      class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
    >
      <X class="h-4 w-4" />
      <span class="sr-only">Close</span>
    </button>
    <AlertDialog.Header class="p-[1.5rem]">
      <AlertDialog.Title>Update Program</AlertDialog.Title>
      <AlertDialog.Description>
        Answer the following field to update the program.
      </AlertDialog.Description>
    </AlertDialog.Header>

    <form
      method="POST"
      action="?/updateProgramEvent"
      use:enhance
      class="flex flex-col gap-[10px] overflow-auto px-[1.5rem] pb-[1.5rem]"
    >
      <input type="hidden" name="id" bind:value={$formData.id} />
      <Form.Field {form} name="name">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Program Name</Form.Label>
            <Input
              {...props}
              bind:value={$formData.name}
              placeholder="Bachelor of Science in Tech..."
            />
          {/snippet}
        </Form.Control>
        <Form.Description />
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="code">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Program Code</Form.Label>
            <Input {...props} bind:value={$formData.code} placeholder="BSIT" />
          {/snippet}
        </Form.Control>
        <Form.Description />
        <Form.FieldErrors />
      </Form.Field>

      <div class=" flex justify-end">
        <Form.Button disabled={$submitting} class="relative">
          {#if $submitting}
            <div
              class="absolute flex h-full w-full items-center justify-center rounded-lg bg-primary"
            >
              <Loader class="h-[15px] w-[15px] animate-spin" />
            </div>
          {/if}
          Update Program
        </Form.Button>
      </div>
    </form>
  </AlertDialog.Content>
</AlertDialog.Root>
