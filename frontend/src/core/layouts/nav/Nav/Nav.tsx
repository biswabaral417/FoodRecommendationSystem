import React from 'react'
import NavLink from '../../../components/atoms/Nav/NavLink'
import LoginOrSignup from './LoginOrSignup'

const Nav: React.FC<{ NavItems: NavItem[] }> = ({ NavItems }) => {

    return (
        <nav className=' bg-gray-100 rounded-lg shadow-md align-center'>
            <ul className='list-none flex p-4 '>

                {
                    NavItems.map((item, index) => (
                        < li key={`nav-item-${index}`} >
                            <NavLink
                                key={index}
                                to={item.path}
                                className={`${(NavItems.length - 1) === index ? 'bordernone' : 'border-r border-gray-300 '}`}
                            >{item.icon} {item.title}</NavLink>
                        </li>

                    ))
                }

                <LoginOrSignup />
            </ul >
        </nav >
    )
}

export default Nav