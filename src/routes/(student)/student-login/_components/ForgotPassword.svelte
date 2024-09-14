<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
  import { studentForgotPwdSchema, type StudentForgotPwdSchema } from '../student-schema';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { Loader } from 'lucide-svelte';
  import type { ResultModel } from '$lib/types';
  import { toast } from 'svelte-sonner';

  interface Props {
    studentForgotPwdForm: SuperValidated<Infer<StudentForgotPwdSchema>>;
  }

  const { studentForgotPwdForm }: Props = $props();

  const form = superForm(studentForgotPwdForm, {
    validators: zodClient(studentForgotPwdSchema),
    id: crypto.randomUUID(),
    invalidateAll: false,
    onUpdate({ result }) {
      const { status, data } = result as ResultModel<{ msg: string }>;

      switch (status) {
        case 200:
          toast.success('Forgot Password', { description: data.msg });
          break;

        case 401:
          toast.error('Forgot Password', { description: data.msg });
          break;
      }
    }
  });

  const { form: formData, enhance, submitting } = form;
</script>

<p class="mt-[5dvh] p-[20px] text-center text-xl font-semibold leading-7">Forgot Password</p>
<form method="POST" action="?/studentForgotPwdEvent" use:enhance class="flex flex-col gap-[10px]">
  <Form.Field {form} name="email">
    <Form.Control let:attrs>
      <Form.Label>Student Email</Form.Label>
      <Input {...attrs} bind:value={$formData.email} placeholder="Enter your email" />
    </Form.Control>

    <Form.FieldErrors />
  </Form.Field>

  <Form.Button disabled={$submitting} class="relative w-full">
    {#if $submitting}
      <div class="absolute flex h-full w-full items-center justify-center rounded-lg bg-primary">
        <Loader class="h-[15px] w-[15px] animate-spin" />
      </div>
    {/if}
    Send Reset Password Link
  </Form.Button>

  <div class=" mt-[20px] flex flex-col gap-[10px]">
    <a href="/student-login" class="mx-auto max-w-fit text-sm transition-all hover:underline"
      >Log in here</a
    >
  </div>
</form>
