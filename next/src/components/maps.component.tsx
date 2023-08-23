'use client'

import useMaps from "@/hooks/useMaps.hook";
import { memo, useRef } from "react";

interface MapsProps {
    directions: any
}

const Maps = ({directions}:MapsProps) => {

    const mapsRef = useRef<HTMLDivElement>(null)
    const {maps} = useMaps(mapsRef)

    const handleLoadindDirections = async () => {
        maps?.removeAllRoutes();
        await maps?.addRouteWithIcons({
            routeId: '',
            startMarkerOptions: {
                position: directions.routes[0].legs[0].start_location
            },
            endMarkerOptions: {
                position: directions.routes[0].legs[0].end_location
            },
            carMarkerOptions: {
                position: directions.routes[0].legs[0].start_location
            }
        })
    }

    handleLoadindDirections()

    return (
        <div id="maps" ref={mapsRef} style={{width: '100%', height: '100%'}}></div>
    )
}

export default memo(Maps);