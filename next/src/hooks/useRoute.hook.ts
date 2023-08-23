'use client'
import { useEffect, useState } from "react"

interface UseRouteProps {
    id?: string
}

const useRoute = ({id}:UseRouteProps) => {
    const [data, setData] = useState<any>([])

    const handleGetRoute = async (id?:string) => {
        const response = await fetch(`http://localhost:4000/routes/route/${id}`)
        const data = await response.json()
        setData(data)
    }

    return {
        data,
        setData,
        handleGetRoute
    }
}

export default useRoute