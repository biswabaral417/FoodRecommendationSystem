import React from 'react'
import Nav from './Nav/Nav'

const Header:React.FC<{NavItems:NavItem[]}> = ({NavItems}) => {
    return (
        <>
            <header><Nav NavItems={NavItems}/></header>
        </>
    )
}

export default Header