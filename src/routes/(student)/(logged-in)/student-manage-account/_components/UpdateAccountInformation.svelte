<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { updateAccInfoSchema, type UpdateAccInfoSchema } from '../student-manage-account-schema';
  import type { ResultModel } from '$lib/types';
  import { toast } from 'svelte-sonner';
  import { fromUserState } from '../../../../_states/fromRootState.svelte';
  import { CircleHelp, Loader } from 'lucide-svelte';
  import * as Popover from '$lib/components/ui/popover';
  import SelectPicker from '$lib/components/general/SelectPicker.svelte';
  import { page } from '$app/stores';

  interface Props {
    updateAccInfoForm: SuperValidated<Infer<UpdateAccInfoSchema>>;
  }

  const { updateAccInfoForm }: Props = $props();

  const user = fromUserState();

  const form = superForm(updateAccInfoForm, {
    validators: zodClient(updateAccInfoSchema),
    id: crypto.randomUUID(),
    onUpdate({ result }) {
      const { status, data } = result as ResultModel<{ msg: string }>;

      switch (status) {
        case 200:
          toast.success('Manage Account', { description: data.msg });
          break;
        case 401:
          toast.error('Manage Account', { description: data.msg });
          break;
      }
    },
    onUpdated({ form }) {
      if (form.valid) {
        initialLoad();
      }
    }
  });

  const { form: formData, enhance, submitting } = form;

  const yearLevel = $derived(
    $formData.yearLevel ? { label: $formData.yearLevel, value: $formData.yearLevel } : undefined
  );

  const courseName = $derived(
    $formData.course ? { label: $formData.course, value: $formData.course } : undefined
  );

  const initialLoad = () => {
    $formData.address = user.getUser()?.user_metadata.address;
    $formData.contactNumber = user.getUser()?.user_metadata.mobile_number;
    $formData.firstName = user.getUser()?.user_metadata.fullname.split(',')[1];
    $formData.middleInitial = user.getUser()?.user_metadata.fullname.split(',')[2];
    $formData.lastName = user.getUser()?.user_metadata.fullname.split(',')[0];
    $formData.nameSuffix = user.getUser()?.user_metadata.suffix;
    $formData.yearLevel = user.getUser()?.user_metadata.year_level;
    $formData.course = user.getUser()?.user_metadata.course;
    $formData.sections = user.getUser()?.user_metadata.section;
  };

  $effect(() => {
    initialLoad();
  });
</script>

<p class="p-[20px] text-center text-xl font-semibold leading-7">Update Information</p>
<form method="POST" action="?/updateAccountEvent" use:enhance class="flex flex-col gap-[10px]">
  <Form.Field {form} name="contactNumber">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Contact Number (optional)</Form.Label>
        <Input
          {...props}
          bind:value={$formData.contactNumber}
          placeholder="Enter your contact number"
        />
      {/snippet}
    </Form.Control>
    <Form.Description />
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="address">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Address (optional)</Form.Label>
        <Input {...props} bind:value={$formData.address} placeholder="Enter your address" />
      {/snippet}
    </Form.Control>
    <Form.Description />
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="firstName">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>First Name</Form.Label>
        <Input
          {...props}
          bind:value={$formData.firstName}
          placeholder="Enter your new first name"
        />
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
          placeholder="Enter your new middle initial"
        />
      {/snippet}
    </Form.Control>
    <Form.Description />
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="lastName">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Last Name</Form.Label>
        <Input {...props} bind:value={$formData.lastName} placeholder="Enter your new last name" />
      {/snippet}
    </Form.Control>
    <Form.Description />
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="nameSuffix">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Last Name</Form.Label>
        <Input {...props} bind:value={$formData.nameSuffix} placeholder="Enter your suffix name" />
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
          placeholder="Select new year level"
          bind:selected={$formData.yearLevel}
          selections={[
            { label: 'First Year', value: 'First Year' },
            { label: 'Second Year', value: 'Second Year' },
            { label: 'Third Year', value: 'Third Year' },
            { label: 'Fourth Year', value: 'Fourth Year' }
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
        <Form.Label>Course</Form.Label>
        <SelectPicker
          placeholder="Select new year level"
          bind:selected={$formData.course}
          hasDescription
          selections={$page.data.studentLayoutQ.programs.map((item) => ({
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

  <Form.Field {form} name="nameSuffix">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Section</Form.Label>
        <div class="relative flex items-center">
          <Input
            {...props}
            bind:value={$formData.sections}
            placeholder="Enter your new section"
            class="pr-[2rem]"
          />
          <Popover.Root>
            <Popover.Trigger class="absolute right-0 mr-[5px]">
              <CircleHelp />
            </Popover.Trigger>
            <Popover.Content>
              <p class="text-sm leading-7">
                Please use formats like <strong>24BSIS-1M,24BSIS-2M,23BSIS-2P1E</strong>.
              </p>

              <p class="text-sm leading-7">Example:</p>
              <p class="text-sm leading-7">Single section: <strong>24BSIS-1M</strong></p>
              <p class="text-sm leading-7">
                Multiple section: <strong>24BSIS-1M,24BSIS-2M,23BSIS-2P1E</strong>.
              </p>
            </Popover.Content>
          </Popover.Root>
        </div>
      {/snippet}
    </Form.Control>
    <Form.Description />
    <Form.FieldErrors />
  </Form.Field>

  <Form.Button disabled={$submitting} class="relative mx-auto w-full sm:w-[300px]">
    {#if $submitting}
      <div class="absolute flex h-full w-full items-center justify-center rounded-lg bg-primary">
        <Loader class="h-[15px] w-[15px] animate-spin" />
      </div>
    {/if}
    Update Information
  </Form.Button>
</form>
