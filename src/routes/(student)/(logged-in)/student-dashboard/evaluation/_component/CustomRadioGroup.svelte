<script lang="ts">
  import { fromDashboardRouteState } from '../../../_states/fromDashboardRoute.svelte';

  interface Props {
    headerTitle: string;
    index: number;
    questionObj: {
      id: string;
      question: string;
      selections: {
        selectionFiveTitle: string;
        selectionFourTitle: string;
        selectionOneTitle: string;
        selectionThreeTitle: string;
        selectionTwoTitle: string;
      };
    };
  }

  const { ...props }: Props = $props();

  const dashboardRoute = fromDashboardRouteState();

  const ratings = [
    {
      title: props.questionObj.selections.selectionOneTitle,
      value: 5
    },
    {
      title: props.questionObj.selections.selectionTwoTitle,
      value: 4
    },
    {
      title: props.questionObj.selections.selectionThreeTitle,
      value: 3
    },
    {
      title: props.questionObj.selections.selectionFourTitle,
      value: 2
    },
    {
      title: props.questionObj.selections.selectionFiveTitle,
      value: 1
    }
  ];

  let active = $state('');
</script>

<div class="">
  <p>
    {props.index + 1} ). {props.questionObj.question}
  </p>
</div>

<div class="flex flex-col gap-[0.625rem] p-[0.625rem] md:flex-row">
  {#each ratings as rating}
    <button
      onclick={() => {
        dashboardRoute.setAnswer({
          headerTitle: props.headerTitle,
          id: props.questionObj.id,
          value: rating.value
        });
        active = rating.title;
      }}
      class="flex max-w-fit items-center gap-[0.625rem]"
    >
      <div
        class="{active === rating.title ? 'border-[2px] bg-primary' : ''}
			h-[20px] w-[20px] rounded-full border-[1px] border-primary"
      ></div>
      <p>{rating.title} <strong class="text-sm text-muted-foreground">({rating.value})</strong></p>
    </button>
  {/each}
</div>
