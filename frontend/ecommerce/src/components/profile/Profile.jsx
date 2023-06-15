import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { deleteuser, getuser, logoutuser } from '../../redux/slice'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { cartDel } from '../../redux/Cart'
import { orderdelete, ordergetuser } from '../../redux/Order'

function Profile() {
    const navigate = useNavigate()
    let load;
    const { id } = useParams()
    console.log(id)
    const dispatch = useDispatch()
    useEffect(() => {


        dispatch(getuser(id))

    }, [])
    useEffect(() => {
        dispatch(ordergetuser({ userId: id }))

    }, [])


    const profile = useSelector((state) => state.login.updateuser)
    const order = useSelector((state) => state.order.order)
    console.log(order)



    console.log(profile)



    return (

        <>
            <div className='container'>
                <div className='row gy-5'>

                    <div className='col-md-4 col-12 mt-5'>
                        <div className='d-flex justify-content-center flex-wrap' style={{ gap: "30px" }}>
                            <div className='text-center w-100'> <img src={`http://localhost:8090/${profile.image}`} className='rounded-circle mb-3  w-50'></img><h3>{profile.username}</h3></div>
                            <div className='d-flex flex-column gap-2'>
                                Name: <h5 class="card-title">{profile.username}</h5>
                                Email: <h5 class="card-title">{profile.email}</h5>

                                <Link to={`/updateprofile/${profile._id}`}><button className='btn btn-primary me-3 mb-3'>UPDATE</button></Link>
                                <button className='btn btn-danger' onClick={() => {
                                    dispatch(deleteuser(profile._id),
                                        dispatch(logoutuser()),
                                        dispatch(cartDel(profile._id)),
                                        dispatch(orderdelete(profile._id)),
                                        navigate("/home")


                                    )
                                }}>DELETE ACCOUNT</button>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-8 col-12'>
                        <div className='p-3'>
                            <h1>ORDERS</h1>

                            <div className='table-responsive'>
                                <table class="table align-middle">
                                    <thead>
                                        <tr>


                                            <th scope="col">Shipping Address</th>
                                            <th scope="col">Order Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.map((e) => {

                                            return <tr>
                                                <td>City : {e.shippingAddress.city}<br></br>
                                                    Country : {e.shippingAddress.country}<br></br>
                                                    Pincode : {e.shippingAddress.pincode} </td>

                                                <td>
                                                    Order Amount : {e.orderAmount}<br></br>
                                                    Transaction ID : {e.transactionId}

                                                </td>

                                            </tr>
                                        })

                                        }


                                    </tbody>
                                </table>

                            </div>


                        </div>
                    </div>
                </div>

            </div>





        </>




    )
}

export default Profile
