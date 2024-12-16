<script lang="ts">
  import type { Infer, SuperValidated } from 'sveltekit-superforms';
  import { page } from '$app/stores';
  import type {
    UpdateStudEmailSchema,
    UpdateStudInfoSchema,
    UpdateStudPwdSchema
  } from '../admin-manage-accounts-schema';
  import * as Table from '$lib/components/ui/table';
  import Actions from './Actions.svelte';
  import Sections from '$lib/components/general/Sections.svelte';

  interface Props {
    updateStudEmailForm: SuperValidated<Infer<UpdateStudEmailSchema>>;
    updateStudPwdForm: SuperValidated<Infer<UpdateStudPwdSchema>>;
    updateStudInfoForm: SuperValidated<Infer<UpdateStudInfoSchema>>;
  }

  const { ...props }: Props = $props();
</script>

<Table.Root>
  <Table.Caption>A list of student accounts</Table.Caption>
  <Table.Header>
    <Table.Row>
      <Table.Head class="w-fit"></Table.Head>
      <Table.Head class="truncate">Student Name</Table.Head>
      <Table.Head class="truncate">Student Email</Table.Head>
      <Table.Head class="truncate">ID Number</Table.Head>
      <Table.Head class="truncate">Year Level</Table.Head>
      <Table.Head class="truncate">Section</Table.Head>
      <Table.Head class="truncate">Program</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each $page.data.adminLayoutQ.students ?? [] as student}
      <Table.Row>
        <Table.Cell>
          <Actions
            {student}
            updateStudEmailForm={props.updateStudEmailForm}
            updateStudPwdForm={props.updateStudPwdForm}
            updateStudInfoForm={props.updateStudInfoForm}
          />
        </Table.Cell>
        <Table.Cell class="font-medium">{student.user_meta_data.fullname}</Table.Cell>
        <Table.Cell class="font-medium">{student.user_meta_data.email}</Table.Cell>
        <Table.Cell class="truncate">{student.user_meta_data.id_number}</Table.Cell>
        <Table.Cell class="truncate">{student.user_meta_data.year_level}</Table.Cell>
        <Table.Cell class="truncate">
          {#if student.user_meta_data.section.split(',').length > 1}
            <Sections sections={student.user_meta_data.section.split(',')} />
          {:else}
            <span>{student.user_meta_data.section}</span>
          {/if}
        </Table.Cell>
        <Table.Cell class="truncate"
          >{student.user_meta_data.course.match(/\(([^)]+)\)/)?.[1]}</Table.Cell
        >
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
