<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { studentUpdatePwdSchema, type StudentUpdatePwdSchema } from '../student-schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Loader } from 'lucide-svelte';
	import type { ResultModel } from '$lib/types';
	import { toast } from 'svelte-sonner';
	import fes_icon from '$lib/assets/fes_icon.png?enhanced';
	import bg_image from '$lib/assets/bg.webp?enhanced';
	import type { User } from '@supabase/supabase-js';
	import { fromUserState } from '../../../_states/fromRootState.svelte';
	import { goto } from '$app/navigation';

	const { data } = $props();

	const user = fromUserState();

	const form = superForm(data.studentUpdatePwdForm, {
		validators: zodClient(studentUpdatePwdSchema),
		id: crypto.randomUUID(),
		invalidateAll: false,
		onUpdate({ result }) {
			const { status, data } = result as ResultModel<{ msg: string; user: User }>;

			switch (status) {
				case 200:
					toast.success('Forgot Password', { description: data.msg });
					user.setUser(data.user);
					goto('/student-dashboard');
					break;

				case 401:
					toast.error('Forgot Password', { description: data.msg });
					break;
			}
		}
	});

	const { form: formData, enhance, submitting } = form;
</script>

<div class="md:grid md:grid-cols-[60%,40%]">
	<div
		class="mx-auto flex w-full max-w-[450px] flex-col justify-center gap-[10px] overflow-auto p-[20px] pb-[50px]"
	>
		<p class="mt-[5dvh] p-[20px] text-center text-xl font-semibold leading-7">Update Password</p>
		<form method="POST" action="?/updatePwdEvent" use:enhance class="flex flex-col gap-[10px]">
			<Form.Field {form} name="newPwd">
				<Form.Control let:attrs>
					<Form.Label>New Password</Form.Label>
					<Input
						type="password"
						{...attrs}
						bind:value={$formData.newPwd}
						placeholder="Enter your new password"
					/>
				</Form.Control>

				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="confirmNewPwd">
				<Form.Control let:attrs>
					<Form.Label>Confirm New Password</Form.Label>
					<Input
						type="password"
						{...attrs}
						bind:value={$formData.confirmNewPwd}
						placeholder="Confirm your new password"
					/>
				</Form.Control>

				<Form.FieldErrors />
			</Form.Field>

			<Form.Button disabled={$submitting} class="relative w-full">
				{#if $submitting}
					<div
						class="absolute flex h-full w-full items-center justify-center rounded-lg bg-primary"
					>
						<Loader class="h-[15px] w-[15px] animate-spin" />
					</div>
				{/if}
				Update Password
			</Form.Button>
		</form>

		<p class="text-center text-sm leading-7 text-muted-foreground">
			Unsaved password changes will be lost if you reload. Please complete the process before
			reloading. Tho it is not recommended.
		</p>
	</div>

	<div class="relative h-screen w-full">
		<!-- Background Image -->
		<enhanced:img
			src={bg_image}
			alt="bg_image"
			class="absolute inset-0 h-full w-full object-cover grayscale filter"
		/>

		<!-- Centered Content -->
		<div class="absolute inset-0 flex flex-col items-center justify-center gap-[10px]">
			<div class="flex flex-col items-center gap-[20px] rounded-lg bg-[#ffffffc0] p-[20px]">
				<div class="flex flex-col items-center justify-center gap-[20px]">
					<enhanced:img src={fes_icon} class="h-[150px] w-[150px]" alt="landing_icon"
					></enhanced:img>
					<p class="text-center text-3xl">
						<strong>ProfEval</strong> System
					</p>
					<p class="text-center text-3xl text-muted-foreground">
						Update <strong class="text-primary">Password</strong>
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
