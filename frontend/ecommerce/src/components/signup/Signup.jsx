import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { loginuser } from '../../redux/slice'


function Signup() {

    const dispatch = useDispatch()
    const text = useSelector((state) => state.login.loginstatus)
    console.log(text)
    const [data, Setdata] = useState({
        username: "",
        password: ""

    })


    function handlesubmit(e) {
        e.preventDefault()
        dispatch(loginuser(data))



    }
    function handlechange(e) {
        const { name, value } = e.target
        Setdata({ ...data, [name]: value })


    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 col-12 mx-md-auto'>
                    <div className='p-4 rounded' style={{ boxShadow: "0 0 5px", marginTop: "90px" }}>

                        <form onSubmit={handlesubmit} >
                            <p className={text == "logged in" ? "text-primary" : "text-danger"}>{text}</p>

                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Usernanme</label>
                                <input class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='username' value={data.username} onChange={handlechange} />

                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Password</label>
                                <input type="password" class="form-control" id="exampleInputPassword1" name='password' value={data.password} onChange={handlechange} />
                            </div>

                            <div className='text-center mb-2'>   <button type="submit" class="btn btn-primary">LOGIN</button></div>
                            <span>if not having an account? kindly <Link to="/register">register</Link></span>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
