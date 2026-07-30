import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { GetCarParks } from '../../services/api';
import { getDistanceFromLatLonInKm } from '../../services/geolocation_distance';

export default function CarparksList() {
    const [carParks, setCarParks] = useState([]);
    const [getRawCarparks, setRawCarParks] = useState();
    const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
    });
    const [sortBy, setSortBy] = useState('alphabetical');
    const [pinned, setPinned] = useState(() => {
        const saved = localStorage.getItem('pinned');
        return saved ? JSON.parse(saved) : [];
    });
    const [focused, setFocused] = useState(null);

    const togglePin = (name) => {
        if (pinned.includes(name)) {
            setPinned(pinned.filter((n) => n !== name));
        } else {
            setPinned([...pinned, name]);
        }
    };

    useEffect(() => {
        localStorage.setItem('pinned', JSON.stringify(pinned));
    }, [pinned]);

    const sortList = [...carParks].sort((a, b) => {
        if (sortBy === 'distance') {
            return a.distance - b.distance;
        }
        return a.name.localeCompare(b.name);
    });

    const pinnedList = sortList.filter((p) => pinned.includes(p.name));
    const unpinnedList = sortList.filter((p) => !pinned.includes(p.name));
    const finalList = [...pinnedList, ...unpinnedList];

    const findLoc = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            (async () => {
                const getCarparks = await GetCarParks();
                const arrayCarparks = Object.keys(getCarparks);
                const carParks = [];
                for (let i = 0; i < arrayCarparks.length; i++) {
                    carParks.push(getCarparks[arrayCarparks[i]]);
                    carParks[i].name = arrayCarparks[i];
                    setLoading(true);
                    carParks[i].distance = getDistanceFromLatLonInKm(
                        position.coords.latitude,
                        position.coords.longitude,
                        getCarparks[arrayCarparks[i]].latitude,
                        getCarparks[arrayCarparks[i]].longitude,
                    );
                }
                setLoading(false);
                setCarParks(carParks);
            })();
        });
    };

    if (loading) {
        return <div>Loading..</div>;
    }

    useEffect(() => {
        findLoc();
    }, []);

    if (focused) {
        return (
            <AppLayout>
                <Head title={focused.name}/>
                    <button onClick={() => setFocused(null)} className='font-semibold mt-2 ml-2'>Go Back</button>
                <div className="flex justify-center items-center flex-col flex-wrap">
                    <div className='w-100 border-3 border-grey-300 p-10 rounded-2xl'>
                    <h1 className='font-bold text-3xl text-center'>{focused.name}</h1>
                    <p>Available Spaces: {focused.availableSpaces}</p>
                    <p>Location: {focused.location}</p>
                    <p>Distance: {focused.distance}</p>
                    <p>Latitude: {focused.latitude}</p>
                    <p>Longitude: {focused.longitude}</p>
                    </div>
                </div>
            </AppLayout>
        )
    }
    return (
        <AppLayout>
            <Head title="Carparks" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex flex-row">
                    <h1 className="mt-3 ml-3 flex flex-1 text-2xl font-bold">CarParks</h1>
                    <button
                        onClick={() => {
                            setSortBy(sortBy === 'alphabetical' ? 'distance' : 'alphabetical');
                        }}
                        className="border-grey-300 rounded-2xl border p-3"
                    >
                        Sort by: {sortBy}
                    </button>
                </div>
                <div className="m-4 flex flex-wrap items-center justify-center gap-3">
                    {finalList.map((park) => (
                        <div key={park.name} className="border-grey-300 flex h-45 w-90 flex-col rounded-2xl border-3 p-5">
                            <div className="flex flex-row">
                                <h1 className="flex-1 text-xl font-semibold" onClick={() => setFocused(park)}>{park.name}</h1>
                                <button onClick={() => togglePin(park.name)} className="border-grey-300 rounded-2xl border p-2 text-sm">
                                    {pinned.includes(park.name) ? 'Unpin' : 'Pin'}
                                </button>
                            </div>
                            <p className="text-sm">Location: {park.location}</p>
                            <p className="text-sm">Available Spaces: {park.availableSpaces}</p>
                            <p className="text-sm">Latitude: {park.latitude}</p>
                            <p className="text-sm">Longitude: {park.longitude}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
