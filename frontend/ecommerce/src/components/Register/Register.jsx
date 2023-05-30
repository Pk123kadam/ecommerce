import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { registeruser } from '../../redux/users'
import { Link } from 'react-router-dom'

function Register() {
    const dispatch = useDispatch()
    const text = useSelector((state) => state.users.registerstatus)
    console.log(text)
    const [data, Setdata] = useState({

    })


    function handlesubmit(e) {
        e.preventDefault()
        dispatch(registeruser(data))




    }
    function handlechange(e) {
        const { name, value } = e.target
        Setdata({ ...data, [name]: value })


    }
    return (
        <div className='w-50 mx-auto p-5' style={{ boxShadow: "0 0 3px", marginTop: "90px" }}>
            <form onSubmit={handlesubmit}>
                <p className={text == "Registered" ? "text-primary" : "text-danger"}>{text}</p>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Username</label>
                    <input class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='username' value={data.username} onChange={handlechange} />

                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handlechange} name='email' value={data.email} />

                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" onChange={handlechange} name='password' value={data.password} />
                </div>

                <div className='text-center mb-3'>    <button type="submit" class="btn btn-primary">REGISTER</button></div>
                <p className='text-center'>   After registration just <Link to="/login">login</Link></p>
            </form>

        </div>
    )
}

export default Register
