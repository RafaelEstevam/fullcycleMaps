import Maps from "./maps.component";
import { FormEvent, useCallback, useContext, useEffect, useState } from "react";
import { API } from "@/settings/api";
import { DriverContext } from "@/app/driver/context";
import { enqueueSnackbar, useSnackbar } from "notistack";

export interface ResultProps {
  id?: string;
  data?: any;
  showFunctions?: boolean;
  showStartRoute?: boolean;
}

const Result = ({
  id,
  data,
  showFunctions = true,
  showStartRoute = false,
}: ResultProps) => {
  const { directions } = data;
  const [name, setName] = useState<string>("");

  const { selectRoute } = useContext(DriverContext);

  const handleSaveRoute = async (e: FormEvent) => {
    e.preventDefault();
    const data = {
      name: name,
      source_id: directions?.request.origin.place_id.replace("place_id:", ""),
      destination_id: directions?.request.destination.place_id.replace(
        "place_id:",
        ""
      ),
    };
    // await API.post("/routes", data);
    await fetch("http://localhost:3000/api/routes", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    enqueueSnackbar("Success", { variant: "success" });
  };

  useEffect(() => {
    if (data) {
      setName(data?.name);
    }
  }, [data]);

  return (
    <form onSubmit={handleSaveRoute}>
      <div className="bg-slate-200 flex flex-col items-center">
        <div className="w-4/6 pt-4 flex justify-center gap-4">
          <input
            name={"name"}
            id={"name"}
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
            className="text-slate-700 p-4 w-full"
            placeholder="Name"
            required
          />
        </div>

        <div className="w-4/6 py-4 flex justify-center gap-4">
          <div className="p-4 bg-slate-500 w-3/6">
            <p className="text-slate-900 text-sm">Origin:</p>
            <p className="text-white">
              {directions?.routes[0].legs[0].start_address}
            </p>
          </div>
          <div className="p-4 bg-slate-500 w-3/6">
            <p className="text-slate-900 text-sm">Destination:</p>
            <p className="text-white">
              {directions?.routes[0].legs[0].end_address}
            </p>
          </div>
        </div>

        <div className="bg-slate-500 w-full h-96">
          {directions && <Maps {...{ directions, showStartRoute }} />}
        </div>

        {showFunctions && (
          <div className="w-4/6 py-4 flex justify-center">
            <button type="submit" className="p-4 bg-cyan-500">
              {id ? "Edit" : "Save"}
            </button>
            <button className="p-4 bg-rose-500">Cancel</button>
          </div>
        )}
      </div>
    </form>
  );
};

export default Result;
