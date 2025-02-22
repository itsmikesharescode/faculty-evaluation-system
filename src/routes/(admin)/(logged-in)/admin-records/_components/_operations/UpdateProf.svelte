<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { CircleHelp, Loader, X } from 'lucide-svelte';
  import Textarea from '$lib/components/ui/textarea/textarea.svelte';
  import type { ProfessorType, ResultModel } from '$lib/types';
  import { toast } from 'svelte-sonner';
  import { updateProfSchema, type UpdateProfSchema } from '../../admin-records-schema';
  import * as Popover from '$lib/components/ui/popover';
  import Button from '$lib/components/ui/button/button.svelte';
  import SelectPicker from '$lib/components/general/SelectPicker.svelte';
  import { page } from '$app/stores';

  interface Props {
    professor: ProfessorType;
    updateProfForm: SuperValidated<Infer<UpdateProfSchema>>;
    updateSignal: boolean;
  }

  let { updateSignal = $bindable(), ...props }: Props = $props();

  const form = superForm(props.updateProfForm, {
    validators: zodClient(updateProfSchema),
    id: crypto.randomUUID(),
    onUpdate({ result }) {
      const { status, data } = result as ResultModel<{
        msg: string;
      }>;

      switch (status) {
        case 200:
          toast.success('Update Professor', { description: data.msg });
          updateSignal = false;
          break;
        case 401:
          toast.error('Update Professor', { description: data.msg });
          break;
      }
    }
  });

  const { form: formData, enhance, submitting } = form;

  const loadValues = () => {
    $formData.department = props.professor.department;
    $formData.profName = props.professor.fullname;
    $formData.sections = props.professor.sections;
  };

  $effect(() => {
    if (updateSignal) loadValues();
  });
</script>

<AlertDialog.Root bind:open={updateSignal}>
  <AlertDialog.Content>
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
    <AlertDialog.Header>
      <AlertDialog.Title>Update Professor</AlertDialog.Title>
      <AlertDialog.Description>
        Answer the following fields to update professor.
      </AlertDialog.Description>
    </AlertDialog.Header>

    <form method="POST" action="?/updateProfEvent" use:enhance class="flex flex-col gap-[10px]">
      <input type="hidden" name="profId" value={props.professor.id} />
      <Form.Field {form} name="department">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Program</Form.Label>

            <SelectPicker
              placeholder="Select program"
              bind:selected={$formData.department}
              selections={$page.data.adminLayoutQ.programs.map((item) => ({
                label: item.name,
                value: item.code
              }))}
            />
            <input type="hidden" name={props.name} bind:value={$formData.department} />
          {/snippet}
        </Form.Control>
        <Form.Description />
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="profName">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Professor Name</Form.Label>
            <Input {...props} bind:value={$formData.profName} />
          {/snippet}
        </Form.Control>
        <Form.Description />
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="sections">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Sections</Form.Label>
            <Textarea
              {...props}
              bind:value={$formData.sections}
              placeholder="24BSIS-1M or view format guides"
            />
          {/snippet}
        </Form.Control>
        <Form.Description />
        <Form.FieldErrors />
      </Form.Field>

      <Popover.Root>
        <Popover.Trigger class="max-w-fit">
          <Button size="sm" variant="outline" class="flex items-center gap-[0.321rem]">
            <span>View Format Guide</span>
            <CircleHelp class="h-[15px] w-[15px]" />
          </Button>
        </Popover.Trigger>
        <Popover.Content>
          <p class="text-sm leading-7">
            Please use formats like <strong>24BSIS-1M,24BSIS-2M,23BSIS-2P1E</strong>
          </p>

          <p class="text-sm leading-7">Example:</p>
          <p class="text-sm leading-7">Single section: <strong>24BSIS-1M</strong></p>
          <p class="text-sm leading-7">
            Multiple section: <strong>24BSIS-1M,24BSIS-2M,23BSIS-2P1E</strong>
          </p>
        </Popover.Content>
      </Popover.Root>

      <div class="flex justify-end">
        <Form.Button disabled={$submitting} class="relative ">
          {#if $submitting}
            <div
              class="absolute flex h-full w-full items-center justify-center rounded-lg bg-primary"
            >
              <Loader class="h-[15px] w-[15px] animate-spin" />
            </div>
          {/if}
          Update
        </Form.Button>
      </div>
    </form>
  </AlertDialog.Content>
</AlertDialog.Root>
