<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import * as Form from '$lib/components/ui/form';
  import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { Loader, X } from 'lucide-svelte';
  import type { ResultModel, StudentType } from '$lib/types';
  import { toast } from 'svelte-sonner';
  import { deleteProgramSchema, type DeleteProgramSchema } from '../../admin-programs-schema';
  import Button from '$lib/components/ui/button/button.svelte';

  interface Props {
    deleteSignal: boolean;
    deleteProgramForm: SuperValidated<Infer<DeleteProgramSchema>>;
  }

  let { deleteSignal = $bindable(), deleteProgramForm }: Props = $props();

  const form = superForm(deleteProgramForm, {
    validators: zodClient(deleteProgramSchema),
    id: crypto.randomUUID(),
    onUpdate({ result }) {
      const { status, data } = result as ResultModel<{ msg: string; data: StudentType[] }>;
      switch (status) {
        case 200:
          toast.success('Delete Program', { description: data.msg });
          deleteSignal = false;
          break;
        case 401:
          toast.error('Delete Program', { description: data.msg });
          break;
      }
    }
  });

  const { form: formData, enhance, submitting } = form;

  $effect(() => {
    if (deleteSignal) {
      $formData.id = 0;
    }
  });
</script>

<AlertDialog.Root bind:open={deleteSignal}>
  <AlertDialog.Content class="max-h-screen">
    <AlertDialog.Header>
      <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
      <AlertDialog.Description>
        This action cannot be undone. This will permanently delete
        <strong>program name</strong>
      </AlertDialog.Description>
    </AlertDialog.Header>

    <form method="POST" action="?/deleteProgramEvent" use:enhance class="">
      <input type="hidden" name="id" bind:value={$formData.id} />

      <AlertDialog.Footer>
        <Button
          variant="secondary"
          onclick={() => {
            deleteSignal = false;
            form.reset();
          }}>Cancel</Button
        >
        <Form.Button disabled={$submitting} class="relative">
          {#if $submitting}
            <div
              class="absolute flex h-full w-full items-center justify-center rounded-lg bg-primary"
            >
              <Loader class="h-[15px] w-[15px] animate-spin" />
            </div>
          {/if}
          Delete
        </Form.Button>
      </AlertDialog.Footer>
    </form>
  </AlertDialog.Content>
</AlertDialog.Root>
