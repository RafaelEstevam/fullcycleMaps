'use client'
import { useState } from "react"

const Form = () => {

    const [formdata, setFormdata] = useState({
        origin: '',
        destination: ''
    })

    const handleSubmit = (e: any) => {
        e.preventDefault()
        console.log(formdata)
    }

    const handleChange = (e: any) => {
        setFormdata({...formdata, ...{[e.target.name]: e.target.value}})
    }

    return (
        <form onSubmit={handleSubmit} className="flex justify-center bg-slate-300 p-4">
            <input
                name={'origin'}
                value={formdata.origin}
                onChange={(e) => handleChange(e)}
                className="text-slate-700 p-4 border-r-2 border-solid border-slate-200"
                placeholder="Origin"
            />
            <input
                name={'destination'}
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