<script setup lang="ts">
import AppSidebar from './components/AppSidebar.vue';
import { SidebarProvider, SidebarTrigger, SidebarInset } from './components/ui/sidebar';
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear">
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
        </div>
      </header>
      <main class="w-full p-4">
        <RouterView />
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>