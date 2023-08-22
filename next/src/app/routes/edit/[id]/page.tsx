'use client'
import Form from '@/components/form.component';
import Result from '@/components/results.component';
import { Route } from "@/interfaces/route.interface";


const Route = ({params}:{params:{ id: string } }) => {
    const {id} = params;

    const data:Route[] = [
        {address: "Rua professora Maria Jose de oliveira"},
        {address: "Rua tancredo Neves"}
    ];
    
    return (
        <div>
            <Form />
            <Result {...{id, data}} />
        </div>
    )
}

export default Route;