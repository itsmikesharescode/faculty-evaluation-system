<script lang="ts">
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';

  interface Props {
    first: number;
    sec: number;
    third: number;
    fourth: number;
    fifth: number;
    sixth: number;
  }

  const { first, sec, third, fourth, fifth, sixth }: Props = $props();

  let chartCanvas: HTMLCanvasElement | undefined = $state(undefined);
  let chartInstance: Chart | null = $state(null);

  const chartValues: number[] = [first, sec, third, fourth, fifth, sixth];
  const chartLabels: string[] = ['1', '2', '3', '4', '5', '6'];

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
      type: 'line', // Changed to 'line'
      data: {
        labels: chartLabels,
        datasets: [
          {
            label: 'User Evaluated This Week',
            backgroundColor: '#000',
            borderColor: '#000', // Added borderColor for line chart
            data: chartValues,
            fill: false // Optional: prevents the area under the line from being filled bla bla bla
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

  /* function getColor() {
		return route.getThemeState() === 'light' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)';
	}

	$effect(() => {
		//for reactive darkmode
		if (chartInstance) {
			chartInstance.data.datasets[0].backgroundColor = getColor();
			chartInstance.data.datasets[0].borderColor = getColor();
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
