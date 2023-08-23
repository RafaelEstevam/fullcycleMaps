'use client'

import { Loader } from "@googlemaps/js-api-loader";
import { useEffect } from "react";

const Maps = () => {

    useEffect(() => {

        (async () => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
                libraries: ['routes', 'geometry'],
            })
            await Promise.all([
                loader.importLibrary('routes'),
                loader.importLibrary('geometry')
            ]);
            new google.maps.Map(document.getElementById("maps") as any, {
                zoom: 15,
                center: {lat: -23.185281, lng: -45.7975456}
            })
        })();
        
    })

    return (
        <div id="maps" style={{width: '100%', height: '100%'}}></div>
    )
}

export default Maps;