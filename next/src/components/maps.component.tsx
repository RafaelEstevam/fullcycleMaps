"use client";

import { DriverContext } from "@/app/driver/context";
import useMaps from "@/hooks/useMaps.hook";
import { socket } from "@/utils/socket.util";
import { memo, useContext, useEffect, useRef } from "react";

interface MapsProps {
  directions: any;
  showStartRoute?: boolean;
}

const Maps = ({ directions, showStartRoute = false }: MapsProps) => {
  const { routeId } = useContext(DriverContext);
  const mapsRef = useRef<HTMLDivElement>(null);
  const { maps } = useMaps(mapsRef);

  const handleLoadindDirections = async () => {
    if (!directions) return;

    maps?.removeAllRoutes();
    await maps?.addRouteWithIcons({
      routeId: "",
      startMarkerOptions: {
        position: directions.routes[0].legs[0].start_location,
      },
      endMarkerOptions: {
        position: directions.routes[0].legs[0].end_location,
      },
      carMarkerOptions: {
        position: directions.routes[0].legs[0].start_location,
      },
    });
  };

  handleLoadindDirections();

  const handleStartRoute = async () => {
    const response = await fetch(
      `http://localhost:4000/routes/route/${routeId}`
    );
    const route = await response.json();

    maps?.removeAllRoutes();
    await maps?.addRouteWithIcons({
      routeId: routeId,
      startMarkerOptions: {
        position: route.directions.routes[0].legs[0].start_location,
      },
      endMarkerOptions: {
        position: route.directions.routes[0].legs[0].end_location,
      },
      carMarkerOptions: {
        position: route.directions.routes[0].legs[0].start_location,
      },
    });

    const { steps } = route.directions.routes[0].legs[0];

    for (const step of steps) {
      await sleep(2000);
      maps?.moveCar(routeId, step.start_location);
      socket.emit("new-points", {
        route_id: routeId,
        lat: step.start_location.lat,
        lng: step.start_location.lng,
      });

      await sleep(2000);
      maps?.moveCar(routeId, step.end_location);
      socket.emit("new-points", {
        route_id: routeId,
        lat: step.end_location.lat,
        lng: step.end_location.lng,
      });
    }
  };

  return (
    <>
      <div
        id="maps"
        ref={mapsRef}
        style={{ width: "100%", height: "100%" }}
      ></div>
      {showStartRoute && (
        <div className="flex justify-center bg-slate-100">
          <div className="w-4/6 py-4 flex justify-center">
            <button className="p-4 bg-cyan-500" onClick={handleStartRoute}>
              Start route
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(Maps);

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
