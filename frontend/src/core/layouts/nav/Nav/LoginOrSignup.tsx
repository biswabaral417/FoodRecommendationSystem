import React from 'react'
import { NavLink } from 'react-router-dom';
import LazyImage from '../../../components/atoms/lazyImage/LazyImage';

const LoginOrSignup:React.FC<{}> = () => {
    const user = JSON.parse(localStorage.getItem("user") || "")
    console.log(user)
    if (user.isAuthenticated) {
        return (
            <>
                <NavLink
                    className={"ml-auto"}
                    to={"/profile"}
                >
                    <LazyImage src={user.userDetails.imageUrl?.replace('/upload/', '/upload/w_50,h_50,c_fill/')}
                        alt="profile"   className=' bg-gray-300 object-cover rounded-full h-[50px] w-[50px]' />

                </NavLink>
            </>
        )
    }

    return (

        <NavLink
            className={"ml-auto bg-blue-700 px-4 p-2 rounded shadow-md text-white hover:bg-blue-600"}

            to={"/login"}
        >login</NavLink>

    )

}

export default LoginOrSignup