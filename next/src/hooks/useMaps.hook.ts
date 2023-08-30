import { Maps } from "@/classes/map.class";
import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useState } from "react"

const useMaps = (containerRef: React.RefObject<HTMLDivElement>) => {
    const [maps, setMaps] = useState<Maps>()

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
            const map = new Maps(containerRef.current!, {
                zoom: 15,
                center: {lat: -23.185281, lng: -45.7975456},
            })
            setMaps(map)
        })();
    }, [containerRef])

    return {
        maps
    }
}

export default useMaps