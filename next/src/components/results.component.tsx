import { Route } from "@/interfaces/route.interface";
import Maps from "./maps.component";

export interface ResultProps{
    id?: string,
    data?: Route[]
}

const Result = ({id, data}: ResultProps) => {
    return (
        <div className="bg-slate-200 flex flex-col items-center">

            <div className="w-4/6 py-4 flex justify-center gap-4">
                {data?.map((item) => (
                    <div className="p-4 bg-slate-500 w-3/6">
                        <p className="text-white">{item.address}</p>
                    </div>
                ))}
            </div>

            <div className="bg-slate-500 w-full h-96">
                {id && (
                    <Maps />
                )}
            </div>

            <div className="w-4/6 py-4 flex justify-center">
                <button className="p-4 bg-cyan-500">{id? 'Edit': 'Save'}</button>
                <button className="p-4 bg-rose-500">Cancel</button>
            </div>
        </div>
    )
}

export default Result;