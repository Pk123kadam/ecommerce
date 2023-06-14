import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { registeruser } from '../../redux/users'
import { Link } from 'react-router-dom'

function Register() {
    const dispatch = useDispatch()
    const text = useSelector((state) => state.users.registerstatus)
    console.log(text)
    const [image, setimage] = useState(null);
    const [data, Setdata] = useState({

    })


    function handlesubmit(e) {
        e.preventDefault()
        const formData = new FormData();
        formData.append('username', data.username);
        formData.append('email', data.email);
        formData.append('image', image);
        formData.append('password', data.password);

        dispatch(registeruser(formData))




    }
    function handlechange(e) {
        const { name, value } = e.target
        Setdata({ ...data, [name]: value })


    }
    function handlefilechange(event) {
        setimage(event.target.files[0]);
    }

    return (
        <div className='container'>
            <div className='row mt-5'>
                <div className='col-md-6 col-12 mx-md-auto'>
                    <div className='p-4' style={{ boxShadow: "0 0 3px" }}>
                        <form onSubmit={handlesubmit} method="post" enctype="multipart/form-data">
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
                                <label for="exampleInputPassword1" class="form-label">image</label>
                                <input type="file" class="form-control" id="exampleInputPassword1" name='image' onChange={handlefilechange} />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Password</label>
                                <input type="password" class="form-control" id="exampleInputPassword1" onChange={handlechange} name='password' value={data.password} />
                            </div>

                            <div className='text-center mb-3'>    <button type="submit" class="btn btn-primary">REGISTER</button></div>
                            <p className='text-center'>   After registration just <Link to="/login">login</Link></p>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
