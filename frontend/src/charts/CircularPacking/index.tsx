import React, {useState, useEffect} from 'react';
import draw from "./vis";
import {CircularPackingProps} from "./types";
import axios from "axios";

export function CircularPacking() {
    const [data, setData] = useState<CircularPackingProps>({data: []});

    useEffect(() => {
        axios.get('http://localhost:8000/students/').then(res => {
            setData({data: res.data})
        })
    }, []);
    useEffect(() => {
        draw(data);
    }, [data]);

    return (
        <div className="vis-circular-packing"/>
    )
}