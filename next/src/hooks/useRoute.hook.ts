"use client";
import { useState } from "react";
import { useSnackbar } from "notistack";

interface UseRouteProps {
  id?: string;
}

const useRoute = ({ id }: UseRouteProps) => {
  const [data, setData] = useState<any>([]);
  const { enqueueSnackbar } = useSnackbar();

  const handleGetRoute = async (id?: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/routes/${id}`);
      const data = await response.json();
      enqueueSnackbar("Success", { variant: "success" });
      setData(data);
    } catch (e) {
      enqueueSnackbar("Error", { variant: "error" });
    }
  };

  return {
    data,
    setData,
    handleGetRoute,
  };
};

export default useRoute;
