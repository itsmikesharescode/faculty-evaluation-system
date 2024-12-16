<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import type { ResultModel, StudentType } from '$lib/types';
  import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { fromManageAccountRouteState } from '../../../../_states/fromAdminManageAccounts.svelte';
  import { page } from '$app/stores';
  import {
    updateStudInfoSchema,
    type UpdateStudInfoSchema
  } from '../../../admin-manage-accounts-schema';
  import { toast } from 'svelte-sonner';
  import { CircleHelp, Loader } from 'lucide-svelte';
  import * as Popover from '$lib/components/ui/popover';
  import SelectPicker from '$lib/components/general/SelectPicker.svelte';

  interface Props {
    student: StudentType;
    updateSignal: boolean;
    updateStudInfoForm: SuperValidated<Infer<UpdateStudInfoSchema>>;
  }

  let { updateSignal = $bindable(), ...props }: Props = $props();

  const form = superForm(props.updateStudInfoForm, {
    validators: zodClient(updateStudInfoSchema),
    id: crypto.randomUUID(),
    onUpdate({ result }) {
      const { status, data } = result as ResultModel<{ msg: string }>;
      switch (status) {
        case 200:
          toast.success('Update Account', { description: data.msg });
          updateSignal = false;
          break;
        case 401:
          toast.error('Update Account', { description: data.msg });
          break;
      }
    }
  });

  const { form: formData, enhance, submitting } = form;

  $effect(() => {
    if (updateSignal) {
      $formData.idNumber = props.student.user_meta_data.id_number;
      $formData.firstName = props.student.user_meta_data.fullname.split(',')[1];
      $formData.middleInitial = props.student.user_meta_data.fullname.split(',')[2];
      $formData.lastName = props.student.user_meta_data.fullname.split(',')[0];
      $formData.nameSuffix = props.student.user_meta_data.suffix;
      $formData.gender = props.student.user_meta_data.gender;
      $formData.yearLevel = props.student.user_meta_data.year_level;
      $formData.course = props.student.user_meta_data.course;
      $formData.sections = props.student.user_meta_data.section;
    }
  });
</script>

<form
  method="POST"
  action="?/updateStudInfoEvent"
  use:enhance
  class="flex flex-col gap-[10px] overflow-auto px-[1.5rem] pb-[1.5rem]"
>
  <div class="grid gap-[0.625rem] sm:grid-cols-2">
    <input type="hidden" name="studentId" value={props.student.student_id} />

    <div>
      <Form.Field {form} name="idNumber">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>ID Number</Form.Label>
            <Input {...props} bind:value={$formData.idNumber} placeholder="Enter new id number" />
          {/snippet}
        </Form.Control>
        <Form.Description />
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="firstName">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>First Name</Form.Label>
            <Input {...props} bind:value={$formData.firstName} placeholder="Enter new first name" />
          {/snippet}
        </Form.Control>
        <Form.Description />
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="middleInitial">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Middle Initial</Form.Label>
            <Input
              {...props}
              bind:value={$formData.middleInitial}
              placeholder="Enter new middle initial"
            />
          {/snippet}
        </Form.Control>
        <Form.Description />
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="lastName">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Middle Initial</Form.Label>
            <Input {...props} bind:value={$formData.lastName} placeholder="Enter new last name" />
          {/snippet}
        </Form.Control>
        <Form.Description />
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="nameSuffix">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Name Suffix(optional)</Form.Label>
            <Input
              {...props}
              bind:value={$formData.nameSuffix}
              placeholder="Enter new suffix name"
            />
          {/snippet}
        </Form.Control>
        <Form.Description />
        <Form.FieldErrors />
      </Form.Field>
    </div>
    <div>
      <Form.Field {form} name="gender">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Gender</Form.Label>
            <SelectPicker
              placeholder="Select gender"
              bind:selected={$formData.gender}
              selections={[
                { label: 'Male', value: 'Male' },
                { label: 'Female', value: 'Female' }
              ]}
            />
            <input type="hidden" name={props.name} bind:value={$formData.gender} />
          {/snippet}
        </Form.Control>
        <Form.Description />
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="yearLevel">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Year Level</Form.Label>
            <SelectPicker
              placeholder="Select year level"
              bind:selected={$formData.yearLevel}
              selections={[
                { label: 'First Year', value: 'First Year' },
                { label: 'Second Year', value: 'Second Year' },
                { label: 'Third Year', value: 'Third Year' },
                { label: 'Fourth Year', value: 'Second Year' }
              ]}
            />
            <input type="hidden" name={props.name} bind:value={$formData.yearLevel} />
          {/snippet}
        </Form.Control>
        <Form.Description />
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="course">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Program</Form.Label>
            <SelectPicker
              placeholder="Select program"
              bind:selected={$formData.course}
              hasDescription
              selections={$page.data.adminLayoutQ.programs.map((item) => ({
                label: item.name,
                value: item.code
              }))}
            />
            <input type="hidden" name={props.name} bind:value={$formData.course} />
          {/snippet}
        </Form.Control>
        <Form.Description />
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="sections">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Section</Form.Label>
            <div class="relative flex items-center">
              <Input
                {...props}
                bind:value={$formData.sections}
                placeholder="Enter new section"
                class="pr-[2rem]"
              />
              <Popover.Root>
                <Popover.Trigger class="absolute right-0 mr-[5px]">
                  <CircleHelp />
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
            </div>
          {/snippet}
        </Form.Control>
        <Form.Description />
        <Form.FieldErrors />
      </Form.Field>
    </div>
  </div>

  <div class=" flex justify-end">
    <Form.Button disabled={$submitting} class="relative">
      {#if $submitting}
        <div class="absolute flex h-full w-full items-center justify-center rounded-lg bg-primary">
          <Loader class="h-[15px] w-[15px] animate-spin" />
        </div>
      {/if}
      Update Information
    </Form.Button>
  </div>
</form>
