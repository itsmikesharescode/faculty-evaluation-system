<script lang="ts">
  interface Props {
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

  const { index, questionObj }: Props = $props();

  const ratings = [
    {
      title: questionObj.selections.selectionOneTitle,
      value: 5
    },
    {
      title: questionObj.selections.selectionTwoTitle,
      value: 4
    },
    {
      title: questionObj.selections.selectionThreeTitle,
      value: 3
    },
    {
      title: questionObj.selections.selectionFourTitle,
      value: 2
    },
    {
      title: questionObj.selections.selectionFiveTitle,
      value: 1
    }
  ];

  let active = $state('');
</script>

<div class="">
  <p>
    {index + 1} ). {questionObj.question}
  </p>
</div>

<div class="flex flex-col gap-[0.625rem] p-[0.625rem] md:flex-row">
  {#each ratings as rating}
    <button
      onclick={() => {
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
