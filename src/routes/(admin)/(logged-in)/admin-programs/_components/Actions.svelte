<script lang="ts">
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import { CircleEllipsis } from 'lucide-svelte';
  import type { Infer, SuperValidated } from 'sveltekit-superforms';
  import type { DeleteProgramSchema, UpdateProgramSchema } from '../admin-programs-schema';
  import DeleteProgram from './_operations/DeleteProgram.svelte';
  import UpdateProgram from './_operations/UpdateProgram.svelte';
  import type { Program } from '$lib/types';

  interface Props {
    program: Program;
    updateProgramForm: SuperValidated<Infer<UpdateProgramSchema>>;
    deleteProgramForm: SuperValidated<Infer<DeleteProgramSchema>>;
  }

  const { updateProgramForm, deleteProgramForm, program }: Props = $props();

  let updateSignal = $state(false);
  let deleteSignal = $state(false);

  const handleUpdate = () => (updateSignal = true);
  const handleDelete = () => (deleteSignal = true);
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger class="flex items-center">
    <CircleEllipsis />
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group class="">
      <DropdownMenu.Item onclick={handleUpdate} class="flex items-center justify-center">
        Update
      </DropdownMenu.Item>
      <DropdownMenu.Item onclick={handleDelete} class="flex items-center justify-center">
        Delete
      </DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>

<UpdateProgram bind:updateSignal {program} {updateProgramForm} />
<DeleteProgram bind:deleteSignal {program} {deleteProgramForm} />
