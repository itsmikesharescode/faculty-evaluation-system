<script lang="ts">
  import fes_icon from '$lib/assets/fes_icon.png?enhanced';
  import type { Snippet } from 'svelte';
  import { Rocket, CircleUser, LogOut, Menu } from 'lucide-svelte';
  import Separator from '$lib/components/ui/separator/separator.svelte';
  import { fly } from 'svelte/transition';
  import * as Sheet from '$lib/components/ui/sheet/index.js';
  import { fromStudentRouteState } from '../_states/fromStudentRoute.svelte';
  import { goto } from '$app/navigation';
  import Logout from './Logout.svelte';
  import { formatName } from '$lib';
  import { fromUserState } from '../../../_states/fromRootState.svelte';
  import Button from '$lib/components/ui/button/button.svelte';

  interface Props {
    children: Snippet;
  }

  let { children }: Props = $props();

  const route = fromStudentRouteState();
  const user = fromUserState();

  let showSideBar = $state(false);
  let showMobileMenu = $state(false);
  let showLogout = $state(false);

  let nativeWidth = $state(0);

  const setRouteFunc = (param: string) => {
    route.setRoute(param);
    showMobileMenu = false;
    showMobileMenu = false;
    goto(param, { invalidateAll: false });
  };
</script>

<svelte:window bind:innerWidth={nativeWidth} />

<div class="relative flex">
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->

  <div
    class="sticky top-0 z-20 hidden h-[70dvh] border-slate-300 md:flex"
    onmouseleave={() => (showSideBar = false)}
    onmouseenter={() => (showSideBar = true)}
  >
    <div class="flex flex-col gap-[20px] p-[10px]">
      <enhanced:img src={fes_icon} alt="nav_icon" class="z-40 mx-auto h-[40px] w-[40px]"
      ></enhanced:img>
      <div class="flex flex-col items-center justify-center gap-[10px]">
        <button
          onclick={() => setRouteFunc('/student-dashboard')}
          class="{route.getRoute() === '/student-dashboard'
            ? 'bg-primary text-white'
            : 'text-black'} 
					p-[10px]"
        >
          <Rocket class="h-[25px] w-[25px]" />
        </button>

        <Separator />

        <button
          onclick={() => setRouteFunc('/student-manage-account')}
          class="{route.getRoute() === '/student-manage-account'
            ? 'bg-primary text-white'
            : 'text-black'}
					p-[10px]"
        >
          <CircleUser class="h-[25px] w-[25px]" />
        </button>

        <Separator />

        <button
          class=" p-[10px]"
          onclick={() => {
            showLogout = true;
            showMobileMenu = false;
          }}
        >
          <LogOut class="h-[25px] w-[25px]" />
        </button>

        <Separator />
      </div>
    </div>

    {#if showSideBar}
      <div
        transition:fly={{ x: -10, duration: 500 }}
        class="absolute z-30 ml-[3.3rem] flex h-screen flex-col gap-[10px] border-r-[1px] border-slate-300 bg-white pr-[10px] pt-[70px]"
      >
        <button
          onclick={() => setRouteFunc('/student-dashboard')}
          class="{route.getRoute() === '/student-dashboard'
            ? 'bg-primary text-white'
            : 'text-black'}
					p-[10px] text-left"
        >
          <p class="h-[25px]">Dashboard</p>
        </button>

        <Separator />
        <button
          onclick={() => setRouteFunc('/student-manage-account')}
          class="{route.getRoute() === '/student-manage-account'
            ? 'bg-primary text-white'
            : 'text-black'}
					p-[10px] text-left"
        >
          <p class="h-[25px] truncate">Manage Account</p>
        </button>

        <Separator />

        <button
          class="p-[10px] text-left"
          onclick={() => {
            showLogout = true;
            showMobileMenu = false;
          }}
        >
          <p class="h-[25px]">Logout</p>
        </button>

        <Separator />
      </div>
    {/if}
  </div>
  <div class="w-full">
    <nav
      class="sticky top-0 z-10 flex items-center justify-between border-b-[1px] p-[10px] backdrop-blur-sm"
    >
      <p class="text-xl leading-7 text-primary"><strong>ProfEval</strong> System</p>

      <div class="flex items-center gap-2.5">
        <Button
          onclick={() => goto('/student-dashboard?tutorial=true&step=1')}
          class="hidden md:flex">Play Tutorial</Button
        >

        <div class="hidden flex-col items-center gap-[5px] text-xl md:flex">
          <p class=" leading-7">
            {formatName(
              user.getUser()?.user_metadata.fullname,
              user.getUser()?.user_metadata.suffix
            )}
          </p>
          <p class=" text-sm leading-7 text-muted-foreground">
            {user.getUser()?.user_metadata.role.toUpperCase()}
          </p>
        </div>

        <button class="md:hidden" onclick={() => (showMobileMenu = true)}>
          <Menu />
        </button>
      </div>
    </nav>

    <div class="">
      {@render children()}
    </div>
  </div>
</div>

<!--Mobile Menu-->
{#if !(nativeWidth >= 768)}
  <Sheet.Root bind:open={showMobileMenu}>
    <Sheet.Content side="left">
      <Sheet.Header class="mt-[5dvh]">
        <Sheet.Title>
          {formatName(user.getUser()?.user_metadata.fullname, user.getUser()?.user_metadata.suffix)}
        </Sheet.Title>
        <Sheet.Description>{user.getUser()?.user_metadata.role}</Sheet.Description>
      </Sheet.Header>
      <div class="grid gap-4 py-4">
        <button
          onclick={() => setRouteFunc('/student-dashboard')}
          class="{route.getRoute() === '/student-dashboard'
            ? 'bg-primary text-white'
            : ''} flex items-center gap-[5px] p-[10px]"
        >
          <Rocket class="h-[25px] w-[25px]" />
          <p class="w-full text-center">Dashboard</p>
        </button>

        <Separator />

        <button
          onclick={() => setRouteFunc('/student-manage-account')}
          class="{route.getRoute() === '/student-manage-account'
            ? 'bg-primary text-white'
            : ''} flex items-center gap-[5px] p-[10px]"
        >
          <CircleUser class="h-[25px] w-[25px]" />
          <p class="w-full text-center">Manage Account</p>
        </button>

        <Separator />

        <button
          class="flex items-center gap-[5px] p-[10px]"
          onclick={() => {
            showLogout = true;
            showMobileMenu = false;
          }}
        >
          <LogOut class="h-[25px] w-[25px]" />
          <p class="w-full text-center">Log out</p>
        </button>

        <Separator />
      </div>
      <Sheet.Footer></Sheet.Footer>
    </Sheet.Content>
  </Sheet.Root>
{/if}

<!--Show Logout-->
<Logout bind:showLogout />
