import axios from "axios";
import { useState, useEffect } from 'react';

export function getEstados() {
    const [data, setData] = useState([]);
    useEffect(async () => {
        const result = await axios(
        'https://api.coronaanalytic.com/journal',
        );
        setData(result.data.values);
    }, []);
    return data;
}

export function getPaises() {
    const [data, setData] = useState([]);
    useEffect(async () => {
        const result = await axios(
        'https://coronavirus-tracker-api.herokuapp.com/v2/locations',
        );
        setData(...data, {paises: result.data.values});
    }, []);
    return data.paises;
}

export function getTotal() {
    const [data, setData] = useState([]);
    useEffect(async () => {
        const result = await axios(
        'https://coronavirus-tracker-api.herokuapp.com/v2/latest',
        );
        setData(...data, {total: result.data.values});
    }, []);
    return data.total;
}