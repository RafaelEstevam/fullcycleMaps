import Maps from "./maps.component";
import { useEffect, useState } from "react";
import { API } from "@/settings/api";

export interface ResultProps{
    id?: string,
    data?: any,
    showFunctions?: boolean, 
}

const Result = ({id, data, showFunctions}: ResultProps) => {

    const {directions} = data;
    const [name, setName] = useState<string>('')

    const handleSaveRoute = async () => {
        const data = {
            name: name,
            source_id: directions?.request.origin.place_id.replace('place_id:', ''),
            destination_id: directions?.request.destination.place_id.replace('place_id:', '')
        }
        await API.post('/routes', data)
    }

    useEffect(() => {
        if(data){
            setName(data?.name)
        }
    }, [data])

    return (
        <div className="bg-slate-200 flex flex-col items-center">

            <div className="w-4/6 pt-4 flex justify-center gap-4">
                <input
                    name={'name'}
                    id={'name'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="text-slate-700 p-4 w-full"
                    placeholder="Name"
                />
            </div>

            <div className="w-4/6 py-4 flex justify-center gap-4">
                <div className="p-4 bg-slate-500 w-3/6">
                    <p className="text-slate-900 text-sm">Origin:</p>
                    <p className="text-white">{directions?.routes[0].legs[0].start_address}</p>
                </div>
                <div className="p-4 bg-slate-500 w-3/6">
                    <p className="text-slate-900 text-sm">Destination:</p>
                    <p className="text-white">{directions?.routes[0].legs[0].end_address}</p>
                </div>
            </div>

            <div className="bg-slate-500 w-full h-96">
                {directions && (
                    <Maps {...{directions}} />
                )}
            </div>
            
            {showFunctions && (
                <div className="w-4/6 py-4 flex justify-center">
                    <button className="p-4 bg-cyan-500" onClick={handleSaveRoute}>{id? 'Edit': 'Save'}</button>
                    <button className="p-4 bg-rose-500">Cancel</button>
                </div>
            )}
            
        </div>
    )
}

Result.defaultProps = {
    showFunctions: true
}

export default Result;