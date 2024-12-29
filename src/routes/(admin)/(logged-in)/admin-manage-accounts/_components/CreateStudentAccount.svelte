<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import Button from '$lib/components/ui/button/button.svelte';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { CircleHelp, Loader, X } from 'lucide-svelte';
  import * as Select from '$lib/components/ui/select/index.js';
  import { createStudentSchema, type CreateStudentSchema } from '../admin-manage-accounts-schema';
  import type { ResultModel, StudentType } from '$lib/types';
  import { toast } from 'svelte-sonner';
  import { fromManageAccountRouteState } from '../../_states/fromAdminManageAccounts.svelte';
  import { page } from '$app/stores';
  import * as Popover from '$lib/components/ui/popover';
  import SelectPicker from '$lib/components/general/SelectPicker.svelte';

  interface Props {
    createStudentForm: SuperValidated<Infer<CreateStudentSchema>>;
  }

  const { createStudentForm }: Props = $props();

  const manageAccountRoute = fromManageAccountRouteState();

  let open = $state(false);

  const form = superForm(createStudentForm, {
    validators: zodClient(createStudentSchema),
    id: crypto.randomUUID(),
    onUpdate({ result }) {
      const { status, data } = result as ResultModel<{ msg: string; data: StudentType[] }>;
      switch (status) {
        case 200:
          toast.success('Create Account', { description: data.msg });
          manageAccountRoute.setStudents(data.data);
          open = false;
          break;
        case 401:
          toast.error('Create Account', { description: data.msg });
          break;
      }
    }
  });

  const { form: formData, enhance, submitting } = form;

  const selectedGender = $derived(
    $formData.gender ? { label: $formData.gender, value: $formData.gender } : undefined
  );

  const yearLevel = $derived(
    $formData.yearLevel ? { label: $formData.yearLevel, value: $formData.yearLevel } : undefined
  );

  const courseName = $derived(
    $formData.course ? { label: $formData.course, value: $formData.course } : undefined
  );
</script>

<Button onclick={() => (open = true)} class="max-w-fit">Create Student Account</Button>

<AlertDialog.Root bind:open>
  <AlertDialog.Content class="flex max-h-screen max-w-[800px] flex-col p-0">
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
      <AlertDialog.Title>Create Student Account</AlertDialog.Title>
      <AlertDialog.Description>
        Answer the following field to create student account.
      </AlertDialog.Description>
    </AlertDialog.Header>

    <form
      method="POST"
      action="?/createStudentAccEvent"
      use:enhance
      class="flex flex-col gap-[10px] overflow-auto px-[1.5rem] pb-[1.5rem]"
    >
      <div class="grid gap-[0.625rem] sm:grid-cols-2">
        <div>
          <Form.Field {form} name="idNumber">
            <Form.Control>
              {#snippet children({ props })}
                <Form.Label>ID Number</Form.Label>
                <Input {...props} bind:value={$formData.idNumber} placeholder="2021-02121" />
              {/snippet}
            </Form.Control>
            <Form.Description />
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="email">
            <Form.Control>
              {#snippet children({ props })}
                <Form.Label>Email</Form.Label>
                <Input {...props} bind:value={$formData.email} placeholder="youremail@gmail.com" />
              {/snippet}
            </Form.Control>
            <Form.Description />
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="firstName">
            <Form.Control>
              {#snippet children({ props })}
                <Form.Label>First Name</Form.Label>
                <Input {...props} bind:value={$formData.firstName} placeholder="Cheska" />
              {/snippet}
            </Form.Control>
            <Form.Description />
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="middleInitial">
            <Form.Control>
              {#snippet children({ props })}
                <Form.Label>Middle Initial</Form.Label>
                <Input {...props} bind:value={$formData.middleInitial} placeholder="A" />
              {/snippet}
            </Form.Control>
            <Form.Description />
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="lastName">
            <Form.Control>
              {#snippet children({ props })}
                <Form.Label>Last Name</Form.Label>
                <Input {...props} bind:value={$formData.lastName} placeholder="Monolith" />
              {/snippet}
            </Form.Control>
            <Form.Description />
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="nameSuffix">
            <Form.Control>
              {#snippet children({ props })}
                <Form.Label>Name Suffix (optional)</Form.Label>
                <Input {...props} bind:value={$formData.nameSuffix} placeholder="Jr" />
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
                    placeholder="24BSIS-2M or read format"
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

          <Form.Field {form} name="password">
            <Form.Control>
              {#snippet children({ props })}
                <Form.Label>Password</Form.Label>
                <Input
                  type="password"
                  {...props}
                  bind:value={$formData.password}
                  placeholder="Enter student password"
                />
              {/snippet}
            </Form.Control>
            <Form.Description />
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="confirmPassword">
            <Form.Control>
              {#snippet children({ props })}
                <Form.Label>Confirm Password</Form.Label>
                <Input
                  type="password"
                  {...props}
                  bind:value={$formData.confirmPassword}
                  placeholder="Confirm student password"
                />
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
            <div
              class="absolute flex h-full w-full items-center justify-center rounded-lg bg-primary"
            >
              <Loader class="h-[15px] w-[15px] animate-spin" />
            </div>
          {/if}
          Create Account
        </Form.Button>
      </div>
    </form>
  </AlertDialog.Content>
</AlertDialog.Root>
