import AppLayout from '@/layouts/app-layout';
import { useEffect, useState } from 'react';
import { GetEvents } from '../../services/api';
import { BASE_URL } from '../../services/config';

export default function Events() {
    const [events, setEvents] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const query = (pageNum) => {
        let url = `${BASE_URL}/events.json?page=${pageNum}`;
        if (startDate) url += `&beginning_date=${startDate}`;
        if (endDate) url += `&ending_date=${endDate}`;
        return url;
    };

    useEffect(() => {
        (async () => {
            const res = await fetch(query(1));
            const data = await res.json();
            setEvents(data.events);
            setPage(1);
        })();
    }, [startDate, endDate]);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 300 && !isLoading) {
            setPage((prev) => prev + 1);
            console.log('current page: ', page);
            nextPage().finally(() => setIsLoading(false));
        }
    };

    const nextPage = async () => {
        setIsLoading(true);
        const ress = await fetch(query(page + 1));
        const nextPageResults = await ress.json();
        console.log(nextPageResults);
        const res = nextPageResults.events;
        setEvents([...events, ...res]);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isLoading, startDate, endDate]);

    return (
        <AppLayout>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div>
                    <h1 className="mt-3 ml-3 flex text-2xl font-bold">Events</h1>
                </div>
                <div className="border-grey-300 flex w-fit flex-row gap-3 rounded-2xl border p-2">
                    <label htmlFor="startDate">Start date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border-grey-500 rounded-2xl border p-0.5"
                    />
                    <label htmlFor="endDate">End date</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border-grey-500 rounded-2xl border p-0.5"
                    />
                </div>
                <div className="m-4 flex flex-wrap items-center justify-center gap-3">
                    {events.map((event) => (
                        <div key={event.title} className="border-grey-300 flex h-115 w-90 flex-col rounded-2xl border-3 p-5">
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
