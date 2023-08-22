import { Route } from "@/interfaces/route.interface";

export interface ResultProps{
    id?: string,
    data?: Route[]
}

const Result = ({id, data}: ResultProps) => {
    return (
        <div className="bg-slate-200 flex flex-col items-center gap-4">

            <div className="pt-4 w-4/6 flex justify-center gap-4">
                {data?.map((item) => (
                    <div className="p-4 bg-slate-500 w-3/6">
                        <p className="text-white">{item.address}</p>
                    </div>
                ))}
            </div>

            <div className="bg-slate-500 p-40 w-full">
                maps here
            </div>

            <button className="p-4 bg-cyan-500">{id? 'Edit': 'Save'}</button>
        </div>
    )
}

export default Result;