"use client";

import useMaps from "@/hooks/useMaps.hook";
import { socket } from "@/utils/socket.util";
import { useEffect, useRef, useState } from "react";

const Admin = () => {
  const mapsRef = useRef<HTMLDivElement>(null);
  const { maps } = useMaps(mapsRef);

  useEffect(() => {
    socket.connect();
    socket.on("admin-new-point", async (data) => {
      console.log(data);
      if (!maps?.hasRoute(data.route_id)) {
        const response = await fetch(
          `http://localhost:4000/routes/route/${data.route_id}`
        );
        const route = await response.json();
        maps?.removeRoute(data.route_id);
        await maps?.addRouteWithIcons({
          routeId: data.route_id,
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
      }
      maps?.moveCar(data.route_id, {
        lat: data.lat,
        lng: data.lng,
      });
    });
    return () => {
      socket.disconnect();
    };
  }, [maps]);

  return (
    <div className="bg-slate-500 w-full h-screen">
      <div
        id="maps"
        ref={mapsRef}
        style={{ width: "100%", height: "100%" }}
      ></div>
    </div>
  );
};

export default Admin;
