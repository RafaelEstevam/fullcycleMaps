"use client";

import Form from "@/components/form.component";
import Result from "@/components/results.component";
import { useState } from "react";
import { RouteContext } from "../context";

const newRoute = () => {
  const [data, setData] = useState<any>({});

  const context = {
    data,
    setData,
  };

  return (
    <RouteContext.Provider value={context}>
      <Form />
      {data?.directions && <Result {...{ data }} />}
    </RouteContext.Provider>
  );
};

export default newRoute;
