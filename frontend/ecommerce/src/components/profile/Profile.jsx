import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { deleteuser, getuser, logoutuser } from '../../redux/slice'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Profile() {
    const navigate = useNavigate()
    let load;
    const { id } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {


        dispatch(getuser(id))

    }, [])


    const profile = useSelector((state) => state.login.updateuser)
    console.log(profile)

    const status = useSelector((state) => state.login.getuser)
    if (status == "pending") {
        load = <h1>loading...</h1>
    }
    console.log(id)


    return (
        <div className='text-center pt-5'>
            {load}
            <h1>{profile.username}</h1>
            <h1>{profile.email}</h1>
            <Link to={`/updateprofile/${profile._id}`}><button className='btn btn-primary me-3'>UPDATE</button></Link>
            <button className='btn btn-danger' onClick={() => {
                dispatch(deleteuser(profile._id),
                    dispatch(logoutuser()),
                    navigate("/")


                )
            }}>DELETE ACCOUNT</button>


        </div>
    )
}

export default Profile
