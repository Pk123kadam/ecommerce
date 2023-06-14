import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Dashboard from '../dashboard/Dashboard'



function Admin() {
    const navigate = useNavigate()
    useEffect(() => {
        fetch("http://localhost:8090/admin", {
            method: "GET",
            mode: 'cors',
            credentials: 'include',

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },


        }

        ).then((data) => {
            return data.json()
        }).then((res) => {
            if (res.message !== "accessed") {
                navigate("/login")

            }
        })
    }, [])




    return (
        <>
            <Dashboard></Dashboard></>

    )
}

export default Admin
