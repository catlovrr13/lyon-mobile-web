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
        longitude: 0
    });

    const findLoc = () => {
        navigator.geolocation.getCurrentPosition(position => {
            (async () => {
            const getCarparks = await GetCarParks();
            const arrayCarparks = Object.keys(getCarparks);
            const carParks = []
            for(let i = 0; i < arrayCarparks.length ; i++){
                carParks.push(getCarparks[arrayCarparks[i]])
                carParks[i].name = arrayCarparks[i]
                setLoading(true)
                carParks[i].distance = getDistanceFromLatLonInKm(position.coords.latitude, position.coords.longitude, getCarparks[arrayCarparks[i]].latitude, getCarparks[arrayCarparks[i]].longitude)
            }
            setLoading(false)
            carParks.sort((a, b) => a.distance - b.distance)
            setCarParks(carParks);
        })();
        })
    };

    if (loading){
        return (
            <div>Loading..</div>
        )
    }

    useEffect(() => {
        findLoc()
    }, []);
    return (
        <AppLayout>
            <Head title="Carparks" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div>
                    <h1 className="mt-3 ml-3 flex text-2xl font-bold">CarParks</h1>
                </div>
                <div className="m-4 flex flex-wrap items-center justify-center gap-3">
                    
                     {carParks.map((park) => (
                        <div key={park.name} className="border-grey-300 flex w-90 flex-col rounded-2xl border-3 p-5">
                            <h1 className="font-semibold">{park.name}</h1>
                            <h1>Available Spaces: {park.availableSpaces}</h1>
                            <h1>Latitude: {park.latitude}</h1>
                            <h1>Longitude: {park.longitude}</h1>
                            <h1>Location: {park.location}</h1>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
