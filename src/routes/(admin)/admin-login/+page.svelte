<script lang="ts">
  import fes_icon from '$lib/assets/fes_icon.png?enhanced';
  import bg_image from '$lib/assets/bg.webp?enhanced';
  import { Undo2 } from 'lucide-svelte';
  import AdminLogin from './_components/AdminLogin.svelte';

  const { data } = $props();
</script>

<div class="md:grid md:grid-cols-[60%,40%]">
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
            Log in as <strong class="text-primary">Admin</strong>
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="overflow-auto md:max-h-screen">
    <div class="sticky top-0 p-[20px]">
      <a
        href="/"
        class="flex max-w-fit items-center gap-[5px] rounded-sm bg-secondary p-[10px] text-sm"
      >
        <Undo2 class="h-[15px] w-[15px]" />
        Back Home
      </a>
    </div>
    <div
      class="mx-auto flex w-full max-w-[450px] flex-col gap-[10px] overflow-auto p-[20px] pb-[50px]"
    >
      <AdminLogin adminLoginForm={data.adminLoginForm} />
    </div>
  </div>
</div>
