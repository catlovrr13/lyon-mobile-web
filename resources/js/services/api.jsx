import { BASE_URL } from "./config";

export const GetCarParks = async () => {
    const response = await fetch(`${BASE_URL}/carparks.json`, {
        "Accept": "application/json"
    })

    const res = await response.json();
    return res;
}

export const GetEvents = async () => {
    const response = await fetch(`${BASE_URL}/events.json`, {
        "Accept": "application/json"
    })

    const res = await response.json();
    return res;
}

export const GetWeather = async () => {
    const response = await fetch(`${BASE_URL}/weather.json`, {
        "Accept": "application/json"
    })

    const res = await response.json();
    return res;
}