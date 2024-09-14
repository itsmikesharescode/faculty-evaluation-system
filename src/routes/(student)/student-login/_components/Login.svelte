<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
  import { studentLoginSchema, type StudentLoginSchema } from '../student-schema';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import type { ResultModel } from '$lib/types';
  import { toast } from 'svelte-sonner';
  import { Loader } from 'lucide-svelte';
  import { goto } from '$app/navigation';
  import { fromUserState } from '../../../_states/fromRootState.svelte';
  import type { User } from '@supabase/supabase-js';

  interface Props {
    studentLoginForm: SuperValidated<Infer<StudentLoginSchema>>;
  }

  const { studentLoginForm }: Props = $props();

  const user = fromUserState();

  const form = superForm(studentLoginForm, {
    validators: zodClient(studentLoginSchema),
    id: crypto.randomUUID(),
    invalidateAll: false,
    onUpdate({ result }) {
      const { status, data } = result as ResultModel<{ msg: string; user: User }>;

      switch (status) {
        case 200:
          toast.success('Log in', { description: data.msg });
          user.setUser(data.user);
          goto('/student-dashboard');
          break;

        case 401:
          toast.error('Log in', { description: data.msg });
          break;
      }
    }
  });

  const { form: formData, enhance, submitting } = form;
</script>

<p class="mt-[5dvh] p-[20px] text-center text-xl font-semibold leading-7">Student Log in</p>
<form method="POST" action="?/studentLoginEvent" use:enhance class="flex flex-col gap-[10px]">
  <Form.Field {form} name="email">
    <Form.Control let:attrs>
      <Form.Label>Student Email</Form.Label>
      <Input {...attrs} bind:value={$formData.email} placeholder="Enter your email" />
    </Form.Control>

    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="password">
    <Form.Control let:attrs>
      <Form.Label>Student Password</Form.Label>
      <Input
        type="password"
        {...attrs}
        bind:value={$formData.password}
        placeholder="Enter your password"
      />
    </Form.Control>

    <Form.FieldErrors />
  </Form.Field>

  <Form.Button disabled={$submitting} class="relative w-full">
    {#if $submitting}
      <div class="absolute flex h-full w-full items-center justify-center rounded-lg bg-primary">
        <Loader class="h-[15px] w-[15px] animate-spin" />
      </div>
    {/if}
    Log in
  </Form.Button>

  <div class=" mt-[20px] flex flex-col gap-[10px]">
    <a
      href="/student-login?k=forgot-password"
      class="mx-auto max-w-fit text-sm transition-all hover:underline">Forgot Password?</a
    >
    <a
      href="/student-login?k=create-account"
      class="mx-auto max-w-fit text-sm transition-all hover:underline">Create Account</a
    >
  </div>
</form>
