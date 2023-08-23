'use client'

import Form from '@/components/form.component';
import Result from '@/components/results.component';
import { RouteContext } from '../../context';
import useRoute from '@/hooks/useRoute.hook';
import { useEffect } from 'react';


const Route = ({params}:{params:{ id: string } }) => {
    const {id} = params;
    const {data, setData, handleGetRoute} = useRoute({id})

    const context = {
        id,
        data,
        setData
    }

    useEffect(() => {
        handleGetRoute(id)
    }, [id])
    
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