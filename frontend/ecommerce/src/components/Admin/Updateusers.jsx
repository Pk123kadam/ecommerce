import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { updateuser } from '../../redux/users'

function Updateusers() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const text = useSelector((state) => state.users.updatestatus)
    console.log(text)
    const [data, Setdata] = useState({

    })
    useEffect(() => {
        fetch(`http://localhost:8090/user/${id}`, {
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
            console.log(res)
            Setdata(res.user)
        })





    }, [])


    function handlesubmit(e) {
        e.preventDefault()
        dispatch(updateuser({ id: id, data }))




    }
    function handlechange(e) {
        const { name, value } = e.target
        Setdata({ ...data, [name]: value })


    }
    return (
        <div>
            <div className='w-50 mx-auto p-5' style={{ boxShadow: "0 0 3px", marginTop: "90px" }}>
                <form onSubmit={handlesubmit}>
                    <p className={text == "Updated" ? "text-primary" : "text-danger"}>{text}</p>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Username</label>
                        <input class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='username' value={data.username} onChange={handlechange} />

                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handlechange} name='email' value={data.email} />

                    </div>


                    <div className='text-center mb-3'>    <button type="submit" class="btn btn-primary">UPDATE</button></div>

                </form>

            </div>

        </div>
    )
}

export default Updateusers
