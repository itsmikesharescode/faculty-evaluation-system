<script lang="ts">
  import { MoveUpRight } from 'lucide-svelte';
  import AddProfessor from './_components/AddProfessor.svelte';
  import RenderProfessor from './_components/RenderProfessors.svelte';
  import { fromAdminRouteState } from '../_states/fromAdminRoute.svelte';
  import { fromDepRouteState } from './_states/fromDepRoutes.svelte';
  import Button, { buttonVariants } from '$lib/components/ui/button/button.svelte';
  import Download from 'lucide-svelte/icons/download';
  import ChevronLeft from 'lucide-svelte/icons/chevron-left';
  import * as XLSX from 'xlsx';
  import { getScoreDescription } from './_helpers/getScoreDescription';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import { page } from '$app/stores';
  const { data } = $props();

  const route = fromAdminRouteState();
  route.setRoute('/admin-departments');

  let activeProgram = $state($page.data.adminLayoutQ.programs[0].code);

  const filteredProgram = $derived.by(() => {
    const programCodes = $page.data.adminLayoutQ.programs.map((item) => item.code);

    if (activeProgram === 'No Programs') {
      return $page.data.adminLayoutQ.professors.filter(
        (prof) => !programCodes.includes(prof.department)
      );
    } else {
      return $page.data.adminLayoutQ.professors.filter((item) => item.department === activeProgram);
    }
  });

  const specificDownload = () => {
    if (!activeProgram) return;
    const worksheet = XLSX.utils.json_to_sheet(
      filteredProgram.map((prof) => {
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
    XLSX.writeFile(workbook, `${activeProgram}_evaluation.xlsx`);
  };

  const downloadAll = () => {
    if (!$page.data.adminLayoutQ.professors) return;
    const worksheet = XLSX.utils.json_to_sheet(
      $page.data.adminLayoutQ.professors.map((prof) => {
        return {
          Professor: prof.fullname,
          Subject: prof.subjects,
          Section: prof.sections,
          Program: prof.department,
          'Created at': prof.created_at,
          'Final Grade': prof.final_grade ? getScoreDescription(Number(prof.final_grade)) : 'N/A'
        };
      })
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, `all_records.xlsx`);
  };

  route.setRoute('/admin-records');
</script>

<div class="flex min-h-screen flex-col gap-[1.25rem] border-l-[1px] border-slate-300 p-[1.25rem]">
  <div
    class="sticky top-[3.3rem] z-10 flex items-center gap-[1.25rem] overflow-auto bg-secondary p-[0.625rem]"
  >
    {#each $page.data.adminLayoutQ.programs as program}
      <button
        onclick={() => {
          activeProgram = program.code;
        }}
        class=" {activeProgram === program.code ? 'bg-primary text-white' : ''}
				flex items-center gap-[5px] px-[0.625rem] text-black"
      >
        {program.code}
        <MoveUpRight class="h-[15px] w-[15px]" />
      </button>
    {/each}

    <button
      onclick={() => {
        activeProgram = 'No Programs';
      }}
      class=" {activeProgram === 'No Programs' ? 'bg-primary text-white' : ''}
				flex items-center gap-[5px] px-[0.625rem] text-black"
    >
      No Program
      <MoveUpRight class="h-[15px] w-[15px]" />
    </button>
  </div>

  <div class="flex items-center justify-between gap-2.5">
    <AddProfessor addProfForm={data.addProfForm} />
    <div class="">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger class={buttonVariants({ variant: 'default' })}>
          <ChevronLeft />
          <span>Download</span>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content side="left">
          <DropdownMenu.Group>
            <DropdownMenu.Item onclick={specificDownload}>
              <Download />
              <span class="font-bold text-muted-foreground">
                Download <span class="font-bold text-black">{activeProgram}</span> records
              </span>
            </DropdownMenu.Item>
            <DropdownMenu.Item onclick={downloadAll}>
              <Download />
              <span class="font-bold text-muted-foreground">
                Download <span class="font-bold text-black">All</span> records
              </span>
            </DropdownMenu.Item>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  </div>

  <RenderProfessor
    {filteredProgram}
    updateProfForm={data.updateProfForm}
    deleteProfForm={data.deleteProfForm}
  />
</div>
