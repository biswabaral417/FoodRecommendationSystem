import React from 'react'
import Header from '../nav/Header'
import { Outlet } from 'react-router-dom'
import  { protectedNavItems } from '../../../utils/navbar/BasicNavItems'

const ProtectedLayout:React.FC<{}> = () => {
    console.log("yep were here")
    return (
        <>
            <Header NavItems={protectedNavItems} />
            <main><Outlet /></main>
        </>)
}

export default ProtectedLayout