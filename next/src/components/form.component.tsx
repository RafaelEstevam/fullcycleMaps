'use client'
import { FormEvent, useState } from "react"

interface SearchDestination {
    origin_id: string,
    destination_id: string
}

const Form = () => {

    const [formdata, setFormdata] = useState({
        source: '',
        destination: ''
    })

    const handleSearchDirections = async ({origin_id, destination_id}: SearchDestination) => {
        const response = await fetch(`http://localhost:4000/directions?originId=${origin_id}&destinationId=${destination_id}`)
        const directions = await response.json()
        console.log(directions)
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const [sourceResponse, destinationResponse] = await Promise.all([
            fetch(`http://localhost:4000/places?text=${formdata.source}`),
            fetch(`http://localhost:4000/places?text=${formdata.destination}`)
        ])

        const [sourcePlace, destinationPlace] = await Promise.all([
            sourceResponse.json(),
            destinationResponse.json()
        ])

        if (sourcePlace.status !== "OK" || destinationPlace.status !== "OK"){
            alert("Unable to search one of the addresses")
            return;
        }

        await handleSearchDirections({
            origin_id: sourcePlace.candidates[0].place_id,
            destination_id: destinationPlace.candidates[0].place_id
        })
    }

    const handleChange = (e: any) => {
        setFormdata({...formdata, ...{[e.target.name]: e.target.value}})
    }

    return (
        <form onSubmit={handleSubmit} className="flex justify-center bg-slate-300 p-4">
            <input
                name={'source'}
                id={'source'}
                value={formdata.source}
                onChange={(e) => handleChange(e)}
                className="text-slate-700 p-4 border-r-2 border-solid border-slate-200"
                placeholder="Source"
            />
            <input
                name={'destination'}
                id={'destination'}
                value={formdata.destination}
                onChange={(e) => handleChange(e)}
                className="text-slate-700 p-4"
                placeholder="Destination"
            />
            <button type="submit" className="p-4 bg-cyan-500 text-white">Search places</button>
        </form>
    )
}

export default Form;