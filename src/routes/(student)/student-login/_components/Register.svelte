<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import * as Select from '$lib/components/ui/select/index.js';
  import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
  import { studentCreateSchema, type StudentCreateSchema } from '../student-schema';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import type { Program, ResultModel } from '$lib/types';
  import { toast } from 'svelte-sonner';
  import { goto } from '$app/navigation';
  import { fromUserState } from '../../../_states/fromRootState.svelte';
  import type { PostgrestSingleResponse, User } from '@supabase/supabase-js';
  import { CircleHelp, Loader } from 'lucide-svelte';
  import * as Popover from '$lib/components/ui/popover';
  import SelectPicker from '$lib/components/general/SelectPicker.svelte';
  import { page } from '$app/stores';
  import { tick } from 'svelte';

  interface Props {
    studentCreateForm: SuperValidated<Infer<StudentCreateSchema>>;
  }

  const { studentCreateForm }: Props = $props();

  const user = fromUserState();

  const form = superForm(studentCreateForm, {
    validators: zodClient(studentCreateSchema),
    id: crypto.randomUUID(),
    invalidateAll: false,
    onUpdate({ result }) {
      const { status, data } = result as ResultModel<{ msg: string; user: User }>;

      switch (status) {
        case 200:
          toast.success('Register', { description: data.msg });
          user.setUser(data.user);
          goto('/student-dashboard');
          break;

        case 401:
          toast.error('Register', { description: data.msg });
          break;
      }
    }
  });

  const { form: formData, enhance, submitting } = form;

  const getPrograms = async () => {
    if (!$page.data.supabase) return [];
    const { data, error } = (await $page.data.supabase
      ?.from('programs_tb')
      .select('*')
      .order('created_at', { ascending: false })) as PostgrestSingleResponse<Program[]>;

    if (error) return [];
    return data;
  };

  let programs = $state<Awaited<ReturnType<typeof getPrograms>>>([]);

  $effect(() => {
    tick().then(async () => {
      programs = await getPrograms();
    });
  });
</script>

<p class="p-[20px] text-center text-xl font-semibold leading-7">Student Registration</p>
<form method="POST" action="?/studentRegisterEvent" use:enhance class="flex flex-col gap-[10px]">
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
          hasDescription
          bind:selected={$formData.course}
          selections={programs.map((item) => ({
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
            placeholder="Enter your section"
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

  <Form.Field {form} name="password">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Password</Form.Label>
        <Input
          type="password"
          {...props}
          bind:value={$formData.password}
          placeholder="Enter password"
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
          placeholder="Confirm password"
        />
      {/snippet}
    </Form.Control>
    <Form.Description />
    <Form.FieldErrors />
  </Form.Field>

  <Form.Button disabled={$submitting} class="relative w-full">
    {#if $submitting}
      <div class="absolute flex h-full w-full items-center justify-center rounded-lg bg-primary">
        <Loader class="h-[15px] w-[15px] animate-spin" />
      </div>
    {/if}
    Register
  </Form.Button>

  <div class=" mt-[20px] flex flex-col gap-[10px]">
    <a href="/student-login" class="mx-auto max-w-fit text-sm transition-all hover:underline">
      Log in here
    </a>
  </div>
</form>
