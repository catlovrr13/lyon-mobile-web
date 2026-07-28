import AppLayout from '@/layouts/app-layout';
import { useEffect, useState } from 'react';
import { GetWeather } from '../../services/api';
import cloudy from './svg/cloudy.svg';
import rainy from './svg/rainy.svg';
import sunny from './svg/sunny.svg';

export default function Weather() {
    const [weather, setWeather] = useState([]);

    useEffect(() => {
        (async () => {
            const getWeather = await GetWeather();
            setWeather(getWeather);
        })();
    }, []);

    // console.log(weather);

    return (
        <AppLayout>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div>
                    <h1 className="mt-3 ml-3 flex text-2xl font-bold">Weather</h1>
                </div>
                <div className="m-4 flex flex-row items-center justify-center gap-3">
                    {weather.map((w) => (
                        <div key={w.date} className="border-grey-300 flex w-90 flex-col rounded-2xl border-3 p-5">
                            <p>{w.date}</p>
                            <img
                                src={w.status === 'sunny' ? sunny : w.status === 'rainy' ? rainy : w.status === 'cloudy' ? cloudy : null}
                                width={100}
                                height={100}
                                className="hover:stroke-{#1c3e60} hover:stroke-1 hover:fill-none"
                            />
                            <p>{w.status}</p>
                            <p>
                                {w.lower_temperature}℃ - {w.upper_temperature}℃
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
