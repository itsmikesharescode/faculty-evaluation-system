<script lang="ts">
	import fes_icon from '../../../assets/fes_icon.png?enhanced';
	import Login from './components/Login.svelte';
	import { page } from '$app/stores';
	import Register from './components/Register.svelte';
	import { Undo2 } from 'lucide-svelte';
	import ForgotPassword from './components/ForgotPassword.svelte';

	const { data } = $props();
</script>

<div class="md:grid md:grid-cols-[60%,40%]">
	<div
		class="flex min-h-[30dvh] flex-col items-center justify-center bg-green-500 pt-[5rem] md:min-h-screen"
	>
		<div class="flex flex-col items-center justify-center gap-[20px]">
			<enhanced:img src={fes_icon} class="h-[150px] w-[150px]" alt="landing_icon"></enhanced:img>
			<p class="text-center text-3xl">Faculty <strong>Evaluation</strong> System</p>
			<p class="text-center text-3xl text-muted-foreground">
				Evaluate as <strong class="text-primary">Student</strong>
			</p>
		</div>
	</div>
	<div class="h-[70px] w-full rounded-b-[100%] bg-green-500 md:hidden"></div>

	<div class=" overflow-auto md:max-h-screen">
		<div class="sticky top-0 p-[20px]">
			<a href="/" class=" flex max-w-fit items-center gap-[5px] rounded-sm bg-secondary p-[10px]">
				<Undo2 class="h-[15px] w-[15px]" />
				Back Home
			</a>
		</div>
		<div
			class="mx-auto flex w-full max-w-[450px] flex-col gap-[10px] overflow-auto p-[20px] pb-[50px]"
		>
			{#if $page.url.searchParams.get('k') === 'create-account'}
				<Register studentCreateForm={data.studentCreateForm} />
			{:else if $page.url.searchParams.get('k') === 'forgot-password'}
				<ForgotPassword studentForgotPwdForm={data.studentForgotPwdForm} />
			{:else}
				<Login studentLoginForm={data.studentLoginForm} />
			{/if}
		</div>
	</div>
</div>
