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
            question: ''
          }
        ]
      }
    ],
    comment: ''
  });

  let errors = $state<ZodIssue[]>();

  const evalErrMsg = (): string | undefined => {
    return errors?.find((item) => item.path[0] === 'evalTitle')?.message;
  };

  const commentErrMsg = () => {
    return errors?.find((item) => item.path[0] === 'comment')?.message;
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

  let submitLoader = $state(false);

  const handleSubmit = async () => {
    const res = surveyCreationSchema.safeParse(questionContainer);

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
        <Label for={header.id} class="font-semibold">Header Title {i + 1}</Label>
        <Input
          type="text"
          id={header.id}
          bind:value={header.headerTitle}
          placeholder={`Enter your header title ${i + 1}`}
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
          </div>
        {/each}

        <div class="flex items-center gap-[5px]">
          <Button
            class="flex items-center gap-[5px]"
            onclick={() => {
              questionContainer.headers[i].questions.push({
                id: crypto.randomUUID(),
                question: ''
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
      <Label for="comment" class="font-semibold">Comment Title</Label>
      <Input
        type="text"
        id="comment"
        bind:value={questionContainer.comment}
        placeholder="Enter the comment title"
      />
      <p class="text-sm text-red-500">{commentErrMsg()}</p>
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
              question: ''
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
