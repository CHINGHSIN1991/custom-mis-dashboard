declare module '@/components/ui/sidebar' {
  import { Component } from 'vue';
  
  export const Sidebar: Component;
  export const SidebarContent: Component;
  export const SidebarFooter: Component;
  export const SidebarGroup: Component;
  export const SidebarGroupAction: Component;
  export const SidebarGroupContent: Component;
  export const SidebarGroupLabel: Component;
  export const SidebarHeader: Component;
  export const SidebarInput: Component;
  export const SidebarInset: Component;
  export const SidebarMenu: Component;
  export const SidebarMenuAction: Component;
  export const SidebarMenuBadge: Component;
  export const SidebarMenuButton: Component;
  export const SidebarMenuItem: Component;
  export const SidebarMenuSkeleton: Component;
  export const SidebarMenuSub: Component;
  export const SidebarMenuSubButton: Component;
  export const SidebarMenuSubItem: Component;
  export const SidebarProvider: Component;
  export const SidebarRail: Component;
  export const SidebarSeparator: Component;
  export const SidebarTrigger: Component;
  
  export const useSidebar: () => {
    isMobile: boolean;
    toggleSidebar: () => void;
  };
  
  export interface SidebarProps {
    side?: 'left' | 'right';
    variant?: 'sidebar' | 'floating' | 'inset';
    collapsible?: 'offcanvas' | 'icon' | 'none';
    class?: string;
  }
} 