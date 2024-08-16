<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';

	interface Props {
		totalStudents: number | null;
		totalEvaluated: number | null;
		totalProfessors: number | null;
	}

	const { totalStudents, totalEvaluated, totalProfessors }: Props = $props();

	let chartCanvas: HTMLCanvasElement | undefined = $state(undefined);
	let chartInstance: Chart | null = $state(null);

	// needs optimize for now lets cohers this sht
	const chartValues: number[] = [totalStudents ?? 0, totalEvaluated ?? 0, totalProfessors ?? 0];
	const chartLabels: string[] = ['Total Students', 'Total Evaluated', 'Total Professors'];

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
						label: 'Bar View',
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
