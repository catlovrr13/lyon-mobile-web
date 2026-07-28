import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    // {
    //     title: 'Dashboard',
    //     url: '/dashboard',
    //     icon: LayoutGrid,
    // },
    {
        title: 'Carparks',
        url: '/carparks',
        icon: LayoutGrid,
    },
    {
        title: 'Events',
        url: '/events',
        icon: LayoutGrid,
    },
    {
        title: 'Weather',
        url: '/weather',
        icon: LayoutGrid,
    },
    {
        title: 'Travel Planner',
        url: '/travel-planner',
        icon: LayoutGrid,
    },
        {
        title: 'Settings',
        url: '/settings',
        icon: LayoutGrid,
    },
];


export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
