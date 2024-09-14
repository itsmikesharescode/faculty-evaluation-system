<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import { type SuperValidated, type Infer } from 'sveltekit-superforms';
  import { X } from 'lucide-svelte';

  import type { StudentType } from '$lib/types';
  import type {
    UpdateStudEmailSchema,
    UpdateStudInfoSchema,
    UpdateStudPwdSchema
  } from '../../admin-manage-accounts-schema';
  import UpdateStudInfo from './_operations/UpdateStudInfo.svelte';
  import UpdateStudEmail from './_operations/UpdateStudEmail.svelte';
  import UpdateStudPwd from './_operations/UpdateStudPwd.svelte';

  interface Props {
    updateSignal: boolean;
    student: StudentType;
    updateStudEmailForm: SuperValidated<Infer<UpdateStudEmailSchema>>;
    updateStudPwdForm: SuperValidated<Infer<UpdateStudPwdSchema>>;
    updateStudInfoForm: SuperValidated<Infer<UpdateStudInfoSchema>>;
  }

  let { updateSignal = $bindable(), ...props }: Props = $props();
</script>

<AlertDialog.Root bind:open={updateSignal}>
  <AlertDialog.Content class="flex max-h-screen max-w-[800px] flex-col p-0">
    <button
      onclick={() => {
        updateSignal = false;
      }}
      class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
    >
      <X class="h-4 w-4" />
      <span class="sr-only">Close</span>
    </button>
    <AlertDialog.Header class="p-[1.5rem] pb-0">
      <AlertDialog.Title>Update Student Account</AlertDialog.Title>
      <AlertDialog.Description>
        Answer the following field to update student account.
      </AlertDialog.Description>
    </AlertDialog.Header>

    <div class="overflow-auto">
      <div class="">
        <UpdateStudEmail
          bind:updateSignal
          student={props.student}
          updateStudEmailForm={props.updateStudEmailForm}
        />
      </div>

      <div class="">
        <UpdateStudPwd
          bind:updateSignal
          student={props.student}
          updateStudPwdForm={props.updateStudPwdForm}
        />
      </div>

      <div class="">
        <UpdateStudInfo
          bind:updateSignal
          student={props.student}
          updateStudInfoForm={props.updateStudInfoForm}
        />
      </div>
    </div>
  </AlertDialog.Content>
</AlertDialog.Root>
