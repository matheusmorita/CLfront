import React from 'react'

type Props = {
    children: any
}

const Row = ({ children }: Props) => {
    return (
        <div className='row'>
            {children}
        </div>
    )
}

export default Row