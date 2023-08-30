'use client'

import Result from "@/components/results.component";
import useRoute from "@/hooks/useRoute.hook";
import { useEffect, useState } from "react";

const Route = () => {
    const [routes, setRoutes] = useState([]);
    const [selectRoute, setSelectRoute] = useState(undefined);
    const {data, setData, handleGetRoute} = useRoute({id:selectRoute});

    const handleGetRoutesList = async () => {
        const routes = await fetch('http://localhost:4000/routes')
        const routesList = await routes.json()
        console.log(routesList)
        setRoutes(routesList)
    }

    const handleStartRoute = () => {
        console.log("start travel")
    }

    useEffect(() => {
        handleGetRoutesList()
    }, [])

    useEffect(() => {
        if(selectRoute){
            handleGetRoute(selectRoute)
        }
    }, [selectRoute])

    return (
        <>
            <div className="flex justify-center bg-slate-300 py-4">
                <div className="w-4/6">
                    <select
                        name={'route'}
                        id={'route'}
                        value={selectRoute}
                        onChange={(e:any) => setSelectRoute(e.target.value)}
                        className="w-full text-slate-700 p-4 border-r-2 border-solid border-slate-200"
                    >
                        <option>Select a route</option>
                        {routes.map((route:any) => (
                            <option value={route.id}>{route.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {data && (
                <Result {...{id: selectRoute, data, showFunctions: false}} />
            )}

            <div className="flex justify-center bg-slate-300 p-4">
                <div className="w-4/6 flex justify-center">
                    <button className="p-4 bg-cyan-500" onClick={handleStartRoute}>Start route</button>
                </div>
            </div>
            
        </>
    )
}

export default Route;