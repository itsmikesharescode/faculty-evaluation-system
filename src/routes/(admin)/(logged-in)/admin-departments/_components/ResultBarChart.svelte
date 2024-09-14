<script lang="ts">
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';
  import type { ProfessorType } from '$lib/types';

  interface Props {
    professor: ProfessorType;
    datas: {
      headerTitle: string;
      percentage: number;
    }[];
  }

  const { ...props }: Props = $props();

  let chartCanvas: HTMLCanvasElement | undefined = $state(undefined);
  let chartInstance: Chart | null = $state(null);

  const chartValues: number[] = props.datas.map((item) => item.percentage);
  const chartLabels: string[] = props.datas.map((item) => item.headerTitle);

  onMount(async () => {
    if (typeof window !== 'undefined') {
      createChart();
    }
  });

  function createChart() {
    if (!chartCanvas) return;

    const ctx = chartCanvas.getContext('2d');
    if (!ctx) return;

    chartInstance = new Chart(ctx, {
      type: 'bar',

      data: {
        labels: chartLabels,
        datasets: [
          {
            label: `Chart bar results for ${props.professor.fullname}`,
            backgroundColor: '#000',
            data: chartValues
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,

        scales: {
          x: {
            display: true,
            offset: true
          },
          y: {
            display: true,
            offset: true
          }
        },
        plugins: {}
      }
    });
  }

  /* $effect(() => {
		if (chartInstance) {
			chartInstance.data.datasets[0].backgroundColor = getColor();
			chartInstance.update();
		}
	}); */
</script>

<canvas bind:this={chartCanvas} id="myChart"></canvas>

<style>
  canvas {
    width: 100% !important;
    height: 100% !important;
  }
</style>
