import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteuser, getusers } from '../../redux/users'
import { Link } from 'react-router-dom'

function Users() {
    const dispatch = useDispatch()

    let load

    useEffect(() => {
        dispatch(getusers())


    }, [])
    const { users, deletestatus, status } = useSelector((state) => state.users
    )
    if (status == "pending") {
        load = <h1>loading...</h1>

    }
    return (
        <div>
            {load}
            <p className={deletestatus == "Deleted" ? "text-primary" : "text-danger"}>{deletestatus}</p>
            <table class="table">
                <thead>
                    <tr>



                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Actions</th>

                    </tr>
                </thead>
                <tbody>

                    {users.map((e, i) => {
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
    )
}

export default Users