<script lang="ts">
  import { BellRing, MoveUpRight } from 'lucide-svelte';
  import { fromStudentRouteState } from '../_states/fromStudentRoute.svelte';
  import { fromDashboardRouteState } from '../_states/fromDashboardRoute.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import type { ProfessorType } from '$lib/types';
  import { goto, pushState } from '$app/navigation';
  import * as Table from '$lib/components/ui/table';
  import Actions from './_components/Actions.svelte';
  import Subjects from '$lib/components/general/Subjects.svelte';
  import { page } from '$app/stores';
  import { Logs } from 'lucide-svelte';
  import { fly } from 'svelte/transition';

  const route = fromStudentRouteState();
  const dashboardRoute = fromDashboardRouteState();

  route.setRoute('/student-dashboard');
  dashboardRoute.resetAnswer();
  dashboardRoute.setActiveProf(null);

  const handleEvaluate = (p: ProfessorType) => {
    dashboardRoute.setActiveProf(p);
    goto('/student-dashboard/evaluation');
  };

  const tutorialPlay = $state([
    {
      details: `<p class="max-w-3xl">
                  "As you can see, the <span class="bg-black px-2 text-green-500"
                    >green background</span
                  >
                  highlights the area for the teacher's name, making it easy to find the teacher you
                  want to evaluate."
                </p>`
    },

    {
      details: `<p class="max-w-3xl">
                  "As you can see, the <span class="bg-black px-2 text-green-500"
                    >green background</span
                  >
                  highlights the area for the deparment's name, making it easy to find the deparment you
                  want to evaluate."
                </p>`
    },

    {
      details: `<p class="max-w-3xl">
                  "As you can see, the <span class="bg-black px-2 text-green-500"
                    >green background</span
                  >
                  highlights the area for the evaluate button, this will redirect you to evaluation form."
                </p>`
    },

    {
      details: `<p class="max-w-3xl">
                  "As you can see, the <span class="bg-black px-2 text-green-500"
                    >green background</span
                  >
                  highlights the area for the evaluation history result button, this will show you the details of your evaluation for this teacher only."
                </p>`
    },

    {
      details: `<p class="max-w-3xl">
                  "As you can see, the <span class="bg-black px-2 text-green-500"
                    >green background</span
                  >
                  highlights the area for the teacher's name, making it easy to find the teacher you
                  already evaluated."
                </p>`
    },
    {
      details: `<p class="max-w-3xl">
                  "As you can see, the <span class="bg-black px-2 text-green-500"
                    >green background</span
                  >
                  highlights the area for the deparment's name, making it easy to find the deparment you
                  already evaluated."
                </p>`
    },
    {
      details: `<p class="max-w-3xl">
                  "As you can see, the <span class="bg-black px-2 text-green-500"
                    >green background</span
                  >
                  highlights the area for the subject's name, making it easy to find the subject you
                  already evaluated."
                </p>`
    },

    {
      details: `<p class="max-w-3xl">
                  "As you can see, the <span class="bg-black px-2 text-green-500"
                    >green background</span
                  >
                  highlights the area for the percentage, making it easy to see your teacher's percentage score for you."
                </p>`
    }
  ]);

  const handleNextStep = async () => {
    const getStep = $page.url.searchParams.get('step');
    if (Number(getStep ?? 0) >= 8) {
      return goto('/student-dashboard');
    }
    goto(`/student-dashboard?tutorial=true&step=${Number(getStep) + 1}`, { noScroll: true });
  };

  const steps = $derived(Number($page.url.searchParams.get('step') ?? 0));
</script>

<div class="min-h-screen border-l-[1px] border-slate-300">
  <div class="bg-slate-100 p-[0.625rem] md:p-[1.25rem]">
    <div class="flex flex-wrap items-center gap-[20px] bg-primary p-[10px] md:flex-nowrap">
      <BellRing class="h-full w-[60px] p-[10px] text-white " />
      <div class="text-white">
        <p class="font-semibold leading-7">Reminder</p>
        <p class="text-sm leading-7">
          You are evaluating your SUBJECT TEACHER, please read the directions before you begin the
          evaluation process. If teachers where wrongly included in the please, please let us know.
          Message us at blabla@gmail.com
        </p>
      </div>
    </div>
  </div>

  <!--To be evaluated-->
  <div class="p-[0.625rem]">
    <div class="flex flex-col p-[10px]">
      <p class="text-xl font-semibold">Evaluation List</p>
      <p class="text-muted-foreground">Below are the list of faculty that needs your evaluation.</p>
    </div>

    <Table.Root>
      {#if !($page.url.searchParams.get('tutorial') === 'true')}
        {#if !dashboardRoute.getProfs()?.length}
          <Table.Caption>There is no record.</Table.Caption>
        {/if}
      {/if}
      <Table.Header>
        <Table.Row>
          <Table.Head class="truncate">Teacher Name</Table.Head>
          <Table.Head class="truncate">Department Name</Table.Head>
          <Table.Head class="w-[200px]"></Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#if $page.url.searchParams.get('tutorial') === 'true'}
          <div class="fixed inset-0 z-30 bg-gray-900 bg-opacity-50 dark:bg-opacity-80">
            <div class="fixed bottom-5 left-0 right-0">
              <div
                class="mx-auto flex max-w-fit items-center gap-2.5 overflow-hidden rounded-full bg-white p-5"
              >
                {#key steps}
                  <div class="" in:fly={{ x: -100 }}>
                    {@html tutorialPlay[steps - 1].details}
                  </div>
                {/key}
                <Button size="sm" onclick={handleNextStep}>Next</Button>
              </div>
            </div>
          </div>
          <Table.Row>
            <Table.Cell class="{steps === 1 ? 'absolute z-40 bg-green-500 shadow-lg' : ''} truncate"
              >Doctor Husay</Table.Cell
            >

            <Table.Cell class="{steps === 2 ? 'absolute z-40 bg-green-500 shadow-lg' : ''} truncate"
              >BSIS</Table.Cell
            >
            <Table.Cell
              class="{steps === 3 ? 'absolute z-40 bg-green-500 shadow-lg' : ''} truncate"
            >
              <Button size="sm" class="flex items-center gap-[5px]">
                Evaluate Now
                <MoveUpRight class="h-[15px] w-[15px]" />
              </Button>
            </Table.Cell>
          </Table.Row>
        {:else}
          {#each dashboardRoute.getProfs() ?? [] as professor, index}
            <Table.Row>
              <Table.Cell class="truncate">{professor.fullname}</Table.Cell>
              <Table.Cell class="truncate">{professor.department}</Table.Cell>
              <Table.Cell class="truncate">
                <Button
                  size="sm"
                  onclick={() => handleEvaluate(professor)}
                  class="flex items-center gap-[5px]"
                >
                  Evaluate Now
                  <MoveUpRight class="h-[15px] w-[15px]" />
                </Button>
              </Table.Cell>
            </Table.Row>
          {/each}
        {/if}
      </Table.Body>
    </Table.Root>
  </div>

  <!--Evaluated area-->
  <div class="p-[0.625rem]">
    <div class="flex flex-col p-[10px]">
      <p class="text-xl font-semibold">Evaluation History</p>
      <p class="text-muted-foreground">Below are the record of evaluation.</p>
    </div>

    <Table.Root>
      {#if !($page.url.searchParams.get('tutorial') === 'true')}
        {#if !dashboardRoute.getEvalds()?.length}
          <Table.Caption>There is no record.</Table.Caption>
        {/if}
      {/if}
      <Table.Header>
        <Table.Row>
          <Table.Head class="w-[3rem]"></Table.Head>
          <Table.Head class="truncate">Teacher Name</Table.Head>
          <Table.Head class="truncate">Department</Table.Head>
          <Table.Head class="truncate">Subjects</Table.Head>
          <Table.Head class="truncate">Result for you(%)</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#if $page.url.searchParams.get('tutorial') === 'true'}
          <Table.Row>
            <Table.Cell class={steps === 4 ? 'absolute z-40 bg-green-500 shadow-lg' : ''}>
              <Logs class="h-[1rem] w-[1rem]" />
            </Table.Cell>
            <Table.Cell class="{steps === 5 ? 'absolute z-40 bg-green-500 shadow-lg' : ''} truncate"
              >Doctor Husay</Table.Cell
            >
            <Table.Cell class="{steps === 6 ? 'absolute z-40 bg-green-500 shadow-lg' : ''} truncate"
              >BSIS</Table.Cell
            >
            <Table.Cell
              class="{steps === 7 ? 'absolute z-40 bg-green-500 shadow-lg' : ''} truncate"
            >
              <span>Prog101</span>
            </Table.Cell>
            <Table.Cell
              class="{steps === 8
                ? 'absolute z-40 bg-green-500 shadow-lg'
                : ''}w-[7rem] truncate text-center">75 %</Table.Cell
            >
          </Table.Row>
        {:else}
          {#each dashboardRoute.getEvalds() ?? [] as professor, index}
            <Table.Row>
              <Table.Cell>
                <Actions {professor} />
              </Table.Cell>
              <Table.Cell class="truncate font-medium">{professor.fullname}</Table.Cell>
              <Table.Cell class="truncate">{professor.department}</Table.Cell>
              <Table.Cell class="truncate">
                {#if professor.subjects.split(',').length > 1}
                  <Subjects subjects={professor.subjects.split(',')} />
                {:else}
                  <span>{professor.subjects}</span>
                {/if}
              </Table.Cell>
              <Table.Cell class="w-[7rem] truncate text-center">
                {(
                  professor.answers_copy
                    .map((item) => item.percentage)
                    .reduce((acc, curr) => acc + curr) / professor.answers_copy.length
                ).toFixed(0)} %
              </Table.Cell>
            </Table.Row>
          {/each}
        {/if}
      </Table.Body>
    </Table.Root>
  </div>
</div>
