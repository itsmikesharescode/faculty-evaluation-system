<script lang="ts">
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label/index';
  import Button from '$lib/components/ui/button/button.svelte';
  import { Paintbrush, Plus, Trash2, CloudUpload, Loader, X } from 'lucide-svelte';
  import { flip } from 'svelte/animate';
  import { fade } from 'svelte/transition';
  import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';

  import { z, type ZodIssue } from 'zod';
  import Textarea from '$lib/components/ui/textarea/textarea.svelte';
  import { toast } from 'svelte-sonner';

  import { fromQuestionnaireRouteState } from '../../_states/fromAdminQuestionnaire.svelte';
  import { fromAdminRouteState } from '../../_states/fromAdminRoute.svelte';
  import { surveyCreationSchema, type SurveyCreationSchema } from './create-questions-schema';
  import { goto } from '$app/navigation';

  const route = fromAdminRouteState();
  const questionnaireRoute = fromQuestionnaireRouteState();

  route.setRoute('/admin-questionnaire');

  const questionContainer = $state<SurveyCreationSchema>({
    evalTitle: '',
    headers: [
      {
        id: crypto.randomUUID(),
        headerTitle: '',
        questions: [
          {
            id: crypto.randomUUID(),
            question: '',
            selections: {
              selectionOneTitle: 'Always',
              selectionTwoTitle: 'Often',
              selectionThreeTitle: 'Sometimes',
              selectionFourTitle: 'Rarely',
              selectionFiveTitle: 'Never'
            }
          }
        ]
      }
    ],
    remark: {
      title: '',
      value: ''
    }
  });

  let errors = $state<ZodIssue[]>();

  const evalErrMsg = (): string | undefined => {
    return errors?.find((item) => item.path[0] === 'evalTitle')?.message;
  };

  const remarkTitleErr = () => {
    return errors?.find((item) => item.path[0] === 'remark')?.message;
  };

  const headerErrMsg = (i: number): string | undefined => {
    return errors?.find(
      (item) => item.path[0] === 'headers' && item.path[1] === i && item.path[2] === 'headerTitle'
    )?.message;
  };

  const questionErrMsg = (i: number, ii: number): string | undefined => {
    return errors?.find(
      (item) =>
        item.path[0] === 'headers' &&
        item.path[1] === i &&
        item.path[2] === 'questions' &&
        item.path[3] === ii &&
        item.path[4] === 'question'
    )?.message;
  };

  const selectionErrMsg = (i: number, ii: number, selectionField: string): string | undefined => {
    return errors?.find(
      (item) =>
        item.path[0] === 'headers' &&
        item.path[1] === i &&
        item.path[2] === 'questions' &&
        item.path[3] === ii &&
        item.path[4] === 'selections' &&
        item.path[5] === selectionField
    )?.message;
  };

  let submitLoader = $state(false);

  const handleSubmit = async () => {
    const res = surveyCreationSchema.safeParse(questionContainer);
    console.log(res.error);
    if (res.success) {
      errors = undefined;

      submitLoader = true;
      const res = await fetch('/admin-questionnaire/create', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(questionContainer)
      });

      const { msg, data } = await res.json();

      if (res.status === 200) {
        toast.success('Evaluation Creation', { description: msg });
        questionnaireRoute.setEvaluation(data);
        goto('/admin-questionnaire');
      } else if (res.status === 401) {
        toast.error('Evaluation Creation', { description: msg });
        submitLoader = false;
      }

      return;
    }

    errors = res.error.issues;
  };
</script>

<div class="sticky top-[3rem] bg-secondary px-[0.625rem] py-[1.25rem]">
  <Breadcrumb.Root>
    <Breadcrumb.List>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/admin-questionnaire">Questionnaires</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Separator />
      <Breadcrumb.Item>
        <Breadcrumb.Page>Create Evaluation</Breadcrumb.Page>
      </Breadcrumb.Item>
    </Breadcrumb.List>
  </Breadcrumb.Root>
</div>

<div
  class="flex min-h-screen flex-col gap-[1.25rem] border-l-[1px] border-slate-300 bg-secondary p-[0.625rem]"
>
  <div class="rounded-lg bg-white px-[0.625rem] py-[1.25rem] shadow-lg">
    <p class="text-center text-xl font-semibold">Evaluation Form Creation</p>
    <div class="grid w-full items-center gap-1.5">
      <Label for="evalTitle" class="font-semibold">Evaluation Title</Label>
      <Input
        type="text"
        id="evalTitle"
        bind:value={questionContainer.evalTitle}
        placeholder="Enter the evaluation title"
      />
      <p class="text-sm text-red-500">{evalErrMsg()}</p>
    </div>
  </div>

  {#each questionContainer.headers as header, i (header)}
    <div
      class="relative flex flex-col gap-[0.625rem] rounded-lg bg-white p-[1rem] shadow-lg"
      in:fade
      animate:flip={{ duration: 350 }}
    >
      {#if questionContainer.headers.length > 1}
        <button
          class="absolute -top-2 right-4 rounded-sm bg-destructive p-[5px] text-white opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          onclick={() => {
            if (questionContainer.headers.length > 1) {
              const filteredHeaders = questionContainer.headers.filter((h) => h.id !== header.id);
              questionContainer.headers = filteredHeaders;
            }
          }}
        >
          <X class="h-[15px] w-[15px]" />
        </button>
      {/if}

      <div class="grid w-full items-center gap-1.5">
        <Label for={header.id} class="font-semibold">Criteria Title {i + 1}</Label>
        <Input
          type="text"
          id={header.id}
          bind:value={header.headerTitle}
          placeholder={`Enter your criteria title ${i + 1}`}
        />
        <p class="text-sm text-red-500">{headerErrMsg(i)}</p>
      </div>

      <div class="flex flex-col gap-[0.625rem] border-l-[2px] border-primary p-[1rem]">
        {#each header.questions as question, ii (question)}
          <div
            id={question.id}
            class="relative rounded-lg bg-secondary px-[0.625rem] py-[1.25rem]"
            in:fade
            animate:flip={{ duration: 350 }}
          >
            {#if questionContainer.headers[i].questions.length > 1}
              <button
                class="absolute -top-2 right-4 rounded-sm bg-destructive p-[5px] text-white opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                onclick={() => {
                  if (questionContainer.headers[i].questions.length > 1) {
                    const filteredQuestion = questionContainer.headers[i].questions.filter(
                      (q) => q.id !== question.id
                    );

                    questionContainer.headers[i].questions = filteredQuestion;
                  }
                }}
              >
                <X class="h-[15px] w-[15px]" />
              </button>
            {/if}

            <div class="grid w-full items-center gap-1.5">
              <Label for={question.id}>Question {ii + 1}</Label>
              <Textarea
                id={question.id}
                bind:value={question.question}
                placeholder={`Enter your question ${ii + 1}`}
              />
              <p class="text-sm text-red-500">{questionErrMsg(i, ii)}</p>
            </div>

            <div class="flex flex-wrap gap-2.5">
              <div class="grid items-center gap-1.5">
                <Label for={question.id}>Selection One Title {ii + 1}</Label>
                <Input
                  id="selectionOneTitle"
                  bind:value={question.selections.selectionOneTitle}
                  placeholder="Enter selection one title (5)"
                />
                <p class="text-sm text-red-500">{selectionErrMsg(i, ii, 'selectionOneTitle')}</p>
              </div>
              <div class="grid items-center gap-1.5">
                <Label for={question.id}>Selection Two Title {ii + 1}</Label>
                <Input
                  id="selectionTwoTitle"
                  bind:value={question.selections.selectionTwoTitle}
                  placeholder="Enter selection two title (4)"
                />
                <p class="text-sm text-red-500">{selectionErrMsg(i, ii, 'selectionTwoTitle')}</p>
              </div>

              <div class="grid items-center gap-1.5">
                <Label for={question.id}>Selection Three Title {ii + 1}</Label>
                <Input
                  id="selectionThreeTitle"
                  bind:value={question.selections.selectionThreeTitle}
                  placeholder="Enter selection three title (3)"
                />
                <p class="text-sm text-red-500">{selectionErrMsg(i, ii, 'selectionThreeTitle')}</p>
              </div>

              <div class="grid items-center gap-1.5">
                <Label for={question.id}>Selection Four Title {ii + 1}</Label>
                <Input
                  id="selectionFourTitle"
                  bind:value={question.selections.selectionFourTitle}
                  placeholder="Enter selection four title (2)"
                />
                <p class="text-sm text-red-500">{selectionErrMsg(i, ii, 'selectionFourTitle')}</p>
              </div>

              <div class="grid items-center gap-1.5">
                <Label for={question.id}>Selection Five Title {ii + 1}</Label>
                <Input
                  id="selectionFiveTitle"
                  bind:value={question.selections.selectionFiveTitle}
                  placeholder="Enter selection one title (1)"
                />
                <p class="text-sm text-red-500">{selectionErrMsg(i, ii, 'selectionFiveTitle')}</p>
              </div>
            </div>
          </div>
        {/each}

        <div class="flex items-center gap-[5px]">
          <Button
            class="flex items-center gap-[5px]"
            onclick={() => {
              questionContainer.headers[i].questions.push({
                id: crypto.randomUUID(),
                question: '',
                selections: {
                  selectionOneTitle: 'Always',
                  selectionTwoTitle: 'Often',
                  selectionThreeTitle: 'Sometimes',
                  selectionFourTitle: 'Rarely',
                  selectionFiveTitle: 'Never'
                }
              });
            }}
          >
            <Plus class="h-[15px] w-[15px]" />
          </Button>
        </div>
      </div>
    </div>
  {/each}

  <div class="rounded-lg bg-white px-[0.625rem] py-[1.25rem] shadow-lg">
    <div class="grid w-full items-center gap-1.5">
      <Label for="comment" class="font-semibold">Remark Title</Label>
      <Input
        type="text"
        id="comment"
        bind:value={questionContainer.remark.title}
        placeholder="Enter the remark title"
      />
      <p class="text-sm text-red-500">{remarkTitleErr()}</p>
    </div>
  </div>

  <!--Submission area-->
  <div class="flex items-center justify-between gap-[5px]">
    <Button
      onclick={() => {
        questionContainer.headers.push({
          id: crypto.randomUUID(),
          headerTitle: '',
          questions: [
            {
              id: crypto.randomUUID(),
              question: '',
              selections: {
                selectionOneTitle: 'Always',
                selectionTwoTitle: 'Often',
                selectionThreeTitle: 'Sometimes',
                selectionFourTitle: 'Rarely',
                selectionFiveTitle: 'Never'
              }
            }
          ]
        });
      }}
      class="flex items-center gap-[5px]"
    >
      <Plus class="h-[15px] w-[15px]" />
    </Button>

    <Button
      disabled={submitLoader}
      onclick={handleSubmit}
      class="relative flex items-center gap-[5px]"
    >
      {#if submitLoader}
        <div class="absolute flex h-full w-full items-center justify-center rounded-lg bg-primary">
          <Loader class="h-[15px] w-[15px] animate-spin" />
        </div>
      {/if}
      Upload
      <CloudUpload class="h-[15px] w-[15px]" />
    </Button>
  </div>
</div>
