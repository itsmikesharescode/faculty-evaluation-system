<script lang="ts">
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import type { ProfessorType } from '$lib/types';
  import { CircleEllipsis } from 'lucide-svelte';
  import type { DeleteProfSchema, UpdateProfSchema } from '../admin-records-schema';
  import { type Infer, type SuperValidated } from 'sveltekit-superforms';
  import UpdateProf from './_operations/UpdateProf.svelte';
  import DeleteProf from './_operations/DeleteProf.svelte';
  import ViewResult from './_operations/ViewResult.svelte';

  interface Props {
    professor: ProfessorType;
    updateProfForm: SuperValidated<Infer<UpdateProfSchema>>;
    deleteProfForm: SuperValidated<Infer<DeleteProfSchema>>;
  }

  const { professor, updateProfForm, deleteProfForm }: Props = $props();

  let viewSignal = $state(false);
  let updateSignal = $state(false);
  let deleteSignal = $state(false);

  const handleView = () => (viewSignal = true);
  const handleUpdate = () => (updateSignal = true);
  const handleDelete = () => (deleteSignal = true);
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger class="flex items-center">
    <CircleEllipsis />
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group class="">
      <DropdownMenu.Item class="flex items-center justify-center" onclick={handleView}>
        View Results
      </DropdownMenu.Item>
      <DropdownMenu.Item class="flex items-center justify-center" onclick={handleUpdate}>
        Update
      </DropdownMenu.Item>
      <DropdownMenu.Item class="flex items-center justify-center" onclick={handleDelete}>
        Delete
      </DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>

<UpdateProf bind:updateSignal {professor} {updateProfForm} />
<DeleteProf bind:deleteSignal {professor} {deleteProfForm} />
<ViewResult bind:viewSignal {professor} />
