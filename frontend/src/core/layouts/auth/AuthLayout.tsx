import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
    return (
        <div className='w-full h-screen flex justify-between px-10 items-center bg-gray-100 '>
            <div>
                aodsjgahgoas[o]
            </div>
            <div className=' bg-white w-140 py-6 rounded-lg shadow-lg flex justify-center'>
                <Outlet />
            </div>
        </div>
    )
}

export default AuthLayout