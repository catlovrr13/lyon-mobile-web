import AppLayout from '@/layouts/app-layout';
import { useEffect, useState } from 'react';
import { GetEvents } from '../../services/api';
import { BASE_URL } from '../../services/config';

export default function Events() {
    const [events, setEvents] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async () => {
            const getEvents = await GetEvents();
            const eventKeys = getEvents.events;
            setEvents(eventKeys);
        })();
    }, []);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 300 && !isLoading) {
            setPage(prev => prev + 1);
            // console.log("current page: ", page)
            nextPage().finally(() => setIsLoading(false));
        }
    };

    const nextPage = async () => {
            setIsLoading(true);
        const ress = await fetch(`${BASE_URL}/events.json?page=${page}`);
        const nextPageResults = await ress.json();
        console.log(nextPageResults);
        const res = nextPageResults.events;
        setEvents([...events, ...res]);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [isLoading]);

    return (
        <AppLayout>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div>
                    <h1 className="mt-3 ml-3 flex text-2xl font-bold">Events</h1>
                </div>
                <div className="m-4 flex flex-wrap items-center justify-center gap-3">
                    {events.map((event) => (
                        <div key={event.title} className="border-grey-300 flex w-90 flex-col rounded-2xl border-3 p-5 h-115">
                            <img src={`http://module_c.test${event.image}`} alt="" width={50} height={50} className="mb-2 w-full rounded-2xl" />
                            <h1 className="font-semibold">{event.title}</h1>
                            <p>Date: {event.date}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
