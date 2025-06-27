import React from 'react'
import { NavLink } from 'react-router-dom';
import { useLocalStorage } from '../../../../utils/customhooks/useLocalStorage';

const LoginOrSignup = () => {
    const isAuthenticated = JSON.parse(localStorage.getItem("user") || "").isAuthenticated || false;
    if (isAuthenticated) {
        return (
            <>
                <NavLink
                    className={"ml-auto"}
                    to={"/profile"}
                >
                    <img src="./cache/profile" alt="" />

                </NavLink>
            </>
        )
    }

    return (

        <NavLink
            className={"ml-auto bg-blue-700 px-4 p-2 rounded shadow-md text-white hover:bg-blue-600"}

            to={"/signup"}
        >Sign up</NavLink>

    )

}

export default LoginOrSignup