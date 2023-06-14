import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteuser, getusers } from '../../redux/users'
import { Link } from 'react-router-dom'
import Loader from '../loader/Loader'

function Users() {
    const dispatch = useDispatch()

    let load

    useEffect(() => {
        dispatch(getusers())


    }, [])
    const { users, deletestatus, status, userfiltered } = useSelector((state) => state.users
    )
    console.log(userfiltered)
    if (status == "pending") {
        load = <Loader></Loader>

    }
    return (
        <div>
            {load}
            <p className={deletestatus == "Deleted" ? "text-primary" : "text-danger"}>{deletestatus}</p>
            <div className='table-responsive'>
                <table class="table">
                    <thead>
                        <tr>



                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">Actions</th>

                        </tr>
                    </thead>
                    <tbody>

                        {userfiltered.map((e, i) => {
                            return <tr key={i}>

                                <td >{e.username}</td>
                                <td>{e.email}</td>
                                <td><Link to={`/updateusers/${e._id}`}><button className='btn btn-primary'>Update</button></Link></td>
                                <td><button className='btn btn-danger' onClick={() => {
                                    dispatch(deleteuser(e._id))
                                }}>Delete</button></td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>





        </div>
    )
}

export default Users
