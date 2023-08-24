'use client'

import Form from "@/components/form.component";
import Result from "@/components/results.component";
import {socket} from "@/utils/socket.util";
import { useEffect, useState } from "react";
import { RouteContext } from "../context";

const newRoute = () => {

    const [data, setData] = useState<any>({})

    const context = {
        data,
        setData
    }

    useEffect(() => {
        socket.connect()
        return () => {
            socket.disconnect()
        }
    }, [])

    return(
        <RouteContext.Provider value={context}>
            <Form />
            {data?.directions && (
                <Result {...{data}} />
            )}
        </RouteContext.Provider>
    )
}

export default newRoute;