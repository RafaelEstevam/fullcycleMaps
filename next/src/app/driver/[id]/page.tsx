'use client'

const Driver = ({params}:{params:{ id: string } }) => {
    const {id} = params;

    return (
        <>Driver {id}</>
    )
}

export default Driver;