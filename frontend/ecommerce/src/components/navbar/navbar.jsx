import React, { useEffect, useState } from 'react'
import "./navbar.css"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { logoutuser, loginuser, verifyuser, updateuser } from '../../redux/slice'
import { getuser } from '../../redux/slice'

import { useNavigate } from 'react-router-dom'
import { filteredBurger } from '../../redux/addburger'
import { getcart } from '../../redux/Cart'



function Navbar() {
    const [fil, Setfil] = useState([])

    const [cat, setcat] = useState("all")
    const [pizza, setpizza] = useState("")

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
    console.log(update_profile.image)
    useEffect(() => {
        console.log("hainnnn")
        dispatch(getuser(profile._id))
        dispatch(getcart(profile._id))

    }, [profile])



    console.log(profile)

    console.log(text)
    // function filter(value) {
    //     console.log("i")
    //     // const bugerfil = burger.filter((e) => {
    //     //     return Object.keys(e).some(key => {
    //     //         console.log(typeof (e[key]))
    //     //         console.log(key)

    //     //         return e[key].toString().toLowerCase().includes(value.toLowerCase())

    //     //     })
    //     // })
    //     const bugerfil = burger.filter((e) => {
    //         if (cat == "all") {
    //             console.log("all")
    //             return e.name.toLowerCase() == value.toLowerCase()

    //         }

    //         else {
    //             return e.name.toLowerCase() == value.toLowerCase() && e.category.toLowerCase() == cat.toLocaleLowerCase()

    //         }

    //     })
    //     console.log(bugerfil)





    //     Setfil(bugerfil)





    // }
    // function fil2(value) {
    //     const userfil = users.filter((e) => {
    //         return Object.keys(e).some(key => {
    //             console.log(typeof (e[key]))
    //             console.log(key)

    //             return e[key].toString().toLowerCase().includes(value.toLowerCase())

    //         })
    //     })
    //     Setuserfil(userfil)


    // }
    function change(e) {
        const val = e.target.value
        setpizza(val)

        // fil2(val)




    }


    function sub(e) {
        e.preventDefault()

        dispatch(filteredBurger(burger.filter((e) => {
            if (cat == "all") {
                return e.name.toLowerCase().includes(pizza.toLowerCase())
            } else {
                return e.name.toLowerCase().includes(pizza.toLowerCase()) && e.category.toLowerCase() == cat.toLocaleLowerCase()

            }
        })))
        // dispatch(filtereduser(userfil))

    }
    function handlecat(e) {
        console.log(e.target.value)
        setcat(e.target.value)

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
                                <input class="form-control me-2" type="search" placeholder="Search pizza" aria-label="Search" onChange={change} />
                                <select onChange={handlecat} class="form-select me-3" aria-label="Default select example">
                                    <option value="all">ALL</option>
                                    <option value="veg">VEG</option>
                                    <option value="non veg">NON-VEG</option>
                                </select>
                                <button class="btn btn-outline-success btn_hover" type='submit'>Search</button>

                            </form>
                            <Link to="/"><img src='pizzalogo.png' style={{ width: "300px", height: "50px" }} className='mt-2'></img></Link>
                            <ul class="navbar-nav  mb-2 mb-lg-0 gap-3 align-items-center">
                                <li class="nav-item">
                                    <Link to="/admin"><button className='btn '>ADMIN</button></Link>
                                </li>
                                {/* <li class="nav-item">
                                    {update_profile.image ? <img src={`http://localhost:8090/${update_profile.image}`} className='w-25 h-25'></img> : null}
                                </li> */}





                                {update_profile.username ? <li class="nav-item"> <Link to={`/profile/${profile._id}`}>  {update_profile.image ? <img src={`http://localhost:8090/${update_profile.image}`} className=' rounded-circle' style={{ width: "60px", height: "60px" }}></img> : null} <button className='btn '> {update_profile.username} </button></Link>  </li> : null}



                                {text == "logged in" ? <li class="nav-item"><button className='btn' onClick={() => {
                                    dispatch(logoutuser())
                                    navigate("/login")

                                }}>LOGOUT</button></li> : (<li class="nav-item">
                                    <Link to="/login"><button className='btn '>LOGIN</button></Link>
                                </li>)}

                                <li class="nav-item" style={{ position: "relative" }}>

                                    <img src='pizza.png' className='img_hover' style={{ width: "50px", height: "50px" }} onClick={() => {
                                        navigate("/cart")
                                    }}></img>
                                    <div className='rounded text-light px-2' style={{ position: "absolute", bottom: "-10px", left: "-10px", backgroundColor: "#ff4d00" }}>{cart.reduce((acc, cr) => acc + cr.quantity, 0)}</div>
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
