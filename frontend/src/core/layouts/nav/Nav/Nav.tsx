import React from 'react'
import NavLink from '../../../components/atoms/Nav/NavLink'
import NavItems from '../../../../utils/navbar/NavItems'

const Nav = () => {
    return (
        <nav>
            <ul className='list-none flex p-4 bg-gray-100 rounded-lg shadow-md'>

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
            </ul >

        </nav >
    )
}

export default Nav