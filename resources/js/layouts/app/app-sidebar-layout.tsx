// resources/js/layouts/app/app-sidebar-layout.tsx
import { Link, usePage } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';
import { Car, CalendarDays, CloudSun, MapPinned, Settings, ChevronLeft } from 'lucide-react';

const mainNavItems = [
    { title: 'Parking', url: '/carparks', icon: Car },
    { title: 'Events', url: '/events', icon: CalendarDays },
    { title: 'Weather', url: '/weather', icon: CloudSun },
    { title: 'Travel', url: '/travel-planner', icon: MapPinned },
    { title: 'Settings', url: '/settings', icon: Settings },
];

export default function AppSidebarLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    const { url } = usePage();
    const title = breadcrumbs.length ? breadcrumbs[breadcrumbs.length - 1].title : 'Lyon Web Service';

    return (
        <div className="min-h-dvh bg-background text-foreground">
            <header className="fixed inset-x-0 top-0 z-20 flex h-14 items-center border-b bg-background px-4">
                <h1 className="text-lg font-semibold">{title}</h1>
            </header>

            <main className="pt-14 pb-16">{children}</main>

            <nav className="fixed inset-x-0 bottom-0 z-20 flex h-16 items-center justify-around border-t bg-background">
                {mainNavItems.map(({ url: href, title, icon: Icon }) => {
                    const active = url.startsWith(href);
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`flex flex-col items-center gap-1 text-xs ${active ? 'text-primary' : 'text-muted-foreground'}`}
                        >
                            <Icon className="h-5 w-5" />
                            {title}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}