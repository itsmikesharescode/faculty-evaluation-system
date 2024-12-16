<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import Button from '$lib/components/ui/button/button.svelte';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { Loader, X } from 'lucide-svelte';
  import { createProgramSchema, type CreateProgramSchema } from '../admin-programs-schema';
  import type { ResultModel, StudentType } from '$lib/types';
  import { toast } from 'svelte-sonner';
  import { fromManageAccountRouteState } from '../../_states/fromAdminManageAccounts.svelte';

  interface Props {
    createProgramForm: SuperValidated<Infer<CreateProgramSchema>>;
  }

  const { createProgramForm }: Props = $props();

  let open = $state(false);

  const form = superForm(createProgramForm, {
    validators: zodClient(createProgramSchema),
    id: crypto.randomUUID(),
    onUpdate({ result }) {
      const { status, data } = result as ResultModel<{ msg: string; data: StudentType[] }>;
      switch (status) {
        case 200:
          toast.success('Create Program', { description: data.msg });
          open = false;
          break;
        case 401:
          toast.error('Create Program', { description: data.msg });
          break;
      }
    }
  });

  const { form: formData, enhance, submitting } = form;
</script>

<Button onclick={() => (open = true)} class="max-w-fit">Create Program</Button>

<AlertDialog.Root bind:open>
  <AlertDialog.Content class="flex max-h-screen flex-col p-0">
    <button
      onclick={() => {
        open = false;
        form.reset();
      }}
      class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
    >
      <X class="h-4 w-4" />
      <span class="sr-only">Close</span>
    </button>
    <AlertDialog.Header class="p-[1.5rem]">
      <AlertDialog.Title>Create Program</AlertDialog.Title>
      <AlertDialog.Description>Answer the following field to program.</AlertDialog.Description>
    </AlertDialog.Header>

    <form
      method="POST"
      action="?/createProgramEvent"
      use:enhance
      class="flex flex-col gap-[10px] overflow-auto px-[1.5rem] pb-[1.5rem]"
    >
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
          Create Program
        </Form.Button>
      </div>
    </form>
  </AlertDialog.Content>
</AlertDialog.Root>
