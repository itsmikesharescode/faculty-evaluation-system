<script lang="ts">
  import { MoveUpRight } from 'lucide-svelte';
  import AddProfessor from './_components/AddProfessor.svelte';
  import RenderProfessor from './_components/RenderProfessors.svelte';
  import { departments, fromDepartmentsRouteState } from '../_states/fromAdminDepartments.svelte';
  import { fromAdminRouteState } from '../_states/fromAdminRoute.svelte';
  import { fromDepRouteState } from './_states/fromDepRoutes.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import Download from 'lucide-svelte/icons/download';
  import * as XLSX from 'xlsx';
  import { getScoreDescription } from './_helpers/getScoreDescription';

  const { data } = $props();

  const route = fromAdminRouteState();
  const depRoute = fromDepRouteState();
  const departmentRoute = fromDepartmentsRouteState();

  route.setRoute('/admin-departments');

  const downloadExcel = () => {
    const depRef = departmentRoute.getDepProf(depRoute.getRoute());
    if (!depRef) return;
    const worksheet = XLSX.utils.json_to_sheet(
      depRef.map((prof) => {
        return {
          Professor: prof.fullname,
          Subject: prof.subjects,
          Section: prof.sections,
          'Created at': prof.created_at,
          'Final Grade': prof.final_grade ? getScoreDescription(Number(prof.final_grade)) : 'N/A'
        };
      })
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, `${depRoute.getRoute()}_evaluation.xlsx`);
  };
</script>

<div class="flex min-h-screen flex-col gap-[1.25rem] border-l-[1px] border-slate-300 p-[1.25rem]">
  <div
    class="sticky top-[3.3rem] z-10 flex items-center gap-[1.25rem] overflow-auto bg-secondary p-[0.625rem]"
  >
    {#each departments as department}
      <button
        onclick={() => {
          depRoute.setRoute(department as 'BSIS' | 'BSE' | 'BTVTED' | 'DOMT' | 'DICT');
        }}
        class=" {department === depRoute.getRoute() ? 'bg-primary text-white' : ''}
				flex items-center gap-[5px] px-[0.625rem] text-black"
      >
        {department}
        <MoveUpRight class="h-[15px] w-[15px]" />
      </button>
    {/each}
  </div>

  <div class="flex items-center justify-between gap-2.5">
    <AddProfessor addProfForm={data.addProfForm} />
    <Button onclick={downloadExcel} class="flex items-center gap-[5px]">
      <Download class="h-[15px] w-[15px]" />
      Download
    </Button>
  </div>

  <RenderProfessor updateProfForm={data.updateProfForm} />
</div>
