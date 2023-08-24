"use client";

import Result from "@/components/results.component";
import useRoute from "@/hooks/useRoute.hook";
import { socket } from "@/utils/socket.util";
import { useCallback, useEffect, useState } from "react";
import { DriverContext } from "../../context";

const Route = () => {
  const [routes, setRoutes] = useState([]);
  const [move, setMove] = useState(false);
  const [steps, setSteps] = useState([]);
  const [selectRoute, setSelectRoute] = useState("");

  const { data, handleGetRoute } = useRoute({ id: selectRoute });

  const handleGetRoutesList = async () => {
    const routes = await fetch("http://localhost:4000/routes");
    const routesList = await routes.json();
    setRoutes(routesList);
  };

  useEffect(() => {
    handleGetRoutesList();
  }, []);

  useEffect(() => {
    if (selectRoute) {
      handleGetRoute(selectRoute);
    }
  }, [selectRoute]);

  useEffect(() => {
    socket.connect();
    socket.emit("message");
    return () => {
      socket.disconnect();
    };
  }, []);

  const context = {
    move,
    setMove,
    steps,
    setSteps,
    routeId: selectRoute,
    socket,
  };

  return (
    <DriverContext.Provider value={context}>
      <div className="flex justify-center bg-slate-300 py-4">
        <div className="w-4/6">
          <select
            name={"route"}
            id={"route"}
            value={selectRoute || ""}
            onChange={(e: any) => setSelectRoute(e.target.value)}
            className="w-full text-slate-700 p-4 border-r-2 border-solid border-slate-200"
          >
            <option>Select a route</option>
            {routes.map((route: any) => (
              <option key={route.id} value={route.id}>
                {route.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {data && (
        <Result
          {...{
            id: selectRoute,
            data,
            showFunctions: false,
            showStartRoute: true,
          }}
        />
      )}
    </DriverContext.Provider>
  );
};

export default Route;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
