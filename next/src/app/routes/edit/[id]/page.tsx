'use client'

import Form from '@/components/form.component';
import Result from '@/components/results.component';
import { Route } from "@/interfaces/route.interface";
import { RouteContext } from '../../context';
import { useEffect, useState } from 'react';


const Route = ({params}:{params:{ id: string } }) => {
    const {id} = params;
    const [data, setData] = useState<Route[]>([])

    const context = {
        id,
        data,
        setData
    }

    const handleGetRoute = async () => {
        const response = await fetch(`http://localhost:4000/routes/route/${id}`)
        const data = await response.json()
        setData(data)
    }

    useEffect(() => {
        handleGetRoute()
    }, [])
    
    return (
        <RouteContext.Provider value={context}>
            <Form />
            {data && (
                <Result {...{id, data}} />
            )}
        </RouteContext.Provider>
    )
}

export default Route;