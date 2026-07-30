import AppLayout from '@/layouts/app-layout';
import { useEffect, useState } from 'react';
import { GetWeather } from '../../services/api';
import CloudyIcon from './svg/cloudy.svg?react';
import RainyIcon from './svg/rainy.svg?react';
import SunnyIcon from './svg/sunny.svg?react';

const ICONS = { Sunny: SunnyIcon, Rainy: RainyIcon, Cloudy: CloudyIcon };

export default function Weather() {
    const [weather, setWeather] = useState([]);

    useEffect(() => {
        (async () => {
            const getWeather = await GetWeather();
            setWeather(getWeather);
        })();
    }, []);


    return (
        <AppLayout>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div>
                    <h1 className="mt-3 ml-3 flex text-2xl font-bold">Weather</h1>
                </div>
                <div className="m-4 flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-15">
                    {weather.map((w) => {

                        const Icon = ICONS[w.status] || SunnyIcon;
                        return (
                            <div key={w.date} className="border-grey-300 flex w-90 h-100 flex-col rounded-2xl border-3 p-5 snap-center shrink-0 items-center">
                                <h1 className='text-2xl mb-3'>{w.date}</h1>
                                <Icon width={200} height={200} className="weather-icon" />
                                <p className='mt-3 font-semibold text-xl'>{w.status}</p>
                                <p className='italic'> 
                                    {w.lower_temperature}℃ - {w.upper_temperature}℃
                                </p>
                            </div>
                        )
                    }
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
