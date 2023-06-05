import React, { useEffect, useState } from 'react'
import "./navbar.css"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { logoutuser, loginuser, verifyuser } from '../../redux/slice'
import { getuser } from '../../redux/slice'

import { useNavigate } from 'react-router-dom'
import { filteredBurger } from '../../redux/addburger'
import { getcart } from '../../redux/Cart'
import { filtereduser } from '../../redux/users'


function Navbar() {
    const [fil, Setfil] = useState([])
    const [userfil, Setuserfil] = useState([])

    console.log(fil)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        console.log("verify")
        dispatch(verifyuser())
    }, [])



    const text = useSelector((state) => state.login.loginstatus)
    const profile = useSelector((state) => state.login.user)
    const update_profile = useSelector((state) => state.login.updateuser)
    const { burger } = useSelector((state) => state.burger)
    const { users, deletestatus, status, filtered } = useSelector((state) => state.users)
    const { cart } = useSelector((state) => state.cart)
    console.log(burger)
    useEffect(() => {
        console.log("hainnnn")
        dispatch(getuser(profile._id))
        dispatch(getcart(profile._id))

    }, [profile])



    console.log(profile)

    console.log(text)
    function filter(value) {
        console.log("i")
        const bugerfil = burger.filter((e) => {
            return Object.keys(e).some(key => {
                console.log(typeof (e[key]))
                console.log(key)

                return e[key].toString().toLowerCase().includes(value.toLowerCase())

            })
        })




        Setfil(bugerfil)





    }
    function fil2(value) {
        const userfil = users.filter((e) => {
            return Object.keys(e).some(key => {
                console.log(typeof (e[key]))
                console.log(key)

                return e[key].toString().toLowerCase().includes(value.toLowerCase())

            })
        })
        Setuserfil(userfil)


    }
    function change(e) {
        const val = e.target.value
        console.log(val)
        filter(val)
        fil2(val)




    }
    function sub(e) {
        e.preventDefault()
        console.log(fil)
        dispatch(filteredBurger(fil)),
            dispatch(filtereduser(userfil))

    }


    return (
        <div style={{ marginBottom: "80px" }}>
            <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top ">
                <div class="container-fluid">

                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className='custom_nav'>

                            <form class="d-flex" onSubmit={sub}>
                                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={change} />
                                <button class="btn btn-outline-success" type='submit'>Search</button>
                            </form>
                            <Link to="/"><button className='btn'>Navbar</button></Link>
                            <ul class="navbar-nav  mb-2 mb-lg-0 gap-3 align-items-center">
                                <li class="nav-item">
                                    <Link to="/admin"><button className='btn '>ADMIN</button></Link>
                                </li>
                                <li class="nav-item">
                                    <Link to={`/profile/${profile._id}`}><button className='btn '>{update_profile.username ? update_profile.username : "PROFILE"}</button></Link>
                                </li>

                                {text == "logged in" ? <button className='btn' onClick={() => {
                                    dispatch(logoutuser())
                                    navigate("/login")

                                }}>LOGOUT</button> : (<li class="nav-item">
                                    <Link to="/login"><button className='btn '>LOGIN</button></Link>
                                </li>)}

                                <li class="nav-item" style={{ position: "relative" }}>
                                    <i class="bi bi-cart4" style={{ fontSize: "27px" }} onClick={() => {
                                        navigate("/cart")
                                    }}></i>
                                    <div className='rounded-circle bg-dark text-light px-2' style={{ position: "absolute", bottom: "-10px", left: "-10px" }}>{cart.reduce((acc, cr) => acc + cr.quantity, 0)}</div>
                                </li>


                            </ul>
                        </div>

                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Navbar
