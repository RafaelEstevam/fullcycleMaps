import { createContext } from "react";

export const DriverContext = createContext<any>({
  move: false,
  setMove: () => {},
  steps: [],
  setSteps: () => {},
  routeId: "",
  socket: () => {},
  selectRoute: "",
});
