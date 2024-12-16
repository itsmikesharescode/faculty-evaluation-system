<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import * as Form from '$lib/components/ui/form';
  import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { Loader } from 'lucide-svelte';
  import type { ProfessorType, ResultModel } from '$lib/types';
  import { toast } from 'svelte-sonner';
  import Button from '$lib/components/ui/button/button.svelte';
  import { deleteProfSchema, type DeleteProfSchema } from '../../admin-records-schema';

  interface Props {
    professor: ProfessorType;
    deleteSignal: boolean;
    deleteProfForm: SuperValidated<Infer<DeleteProfSchema>>;
  }

  let { deleteSignal = $bindable(), deleteProfForm, professor }: Props = $props();

  const form = superForm(deleteProfForm, {
    validators: zodClient(deleteProfSchema),
    id: crypto.randomUUID(),
    onUpdate({ result }) {
      const { status, data } = result as ResultModel<{ msg: string }>;
      switch (status) {
        case 200:
          toast.success('Delete Professor', { description: data.msg });
          deleteSignal = false;
          break;
        case 401:
          toast.error('Delete Professor', { description: data.msg });
          break;
      }
    }
  });

  const { form: formData, enhance, submitting } = form;

  $effect(() => {
    if (deleteSignal) {
      $formData.profId = professor.id;
    }
  });
</script>

<AlertDialog.Root bind:open={deleteSignal}>
  <AlertDialog.Content class="max-h-screen">
    <AlertDialog.Header>
      <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
      <AlertDialog.Description>
        This action cannot be undone. This will permanently delete
        <strong>{professor.fullname}</strong>
      </AlertDialog.Description>
    </AlertDialog.Header>

    <form method="POST" action="?/deleteProfEvent" use:enhance class="">
      <input type="hidden" name="profId" bind:value={$formData.profId} />

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
