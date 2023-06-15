import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deliver, orderget } from '../../redux/Order'
import Loader from '../loader/Loader'

function OrderAdmin() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(orderget())

    }, [])
    const { order, load } = useSelector((state) => state.order)
    console.log(order)
    return (
        <div>
            {load ? <Loader></Loader> :
                <div className='table-responsive'>

                    <table class="table ">
                        <thead>
                            <tr>
                                <th scope="col">Order ID</th>
                                <th scope="col">Email   </th>
                                <th scope="col">User ID</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Date</th>
                                <th scope="col">Status</th>

                            </tr>
                        </thead>
                        <tbody>

                            {order.map((e, i) => {
                                return <tr key={i}>
                                    <td>{e._id}</td>
                                    <td>{e.email}</td>
                                    <td>{e.userId}</td>
                                    <td>{e.orderAmount}</td>
                                    <td>{e.createdAt.substring(0, 10)}</td>
                                    <td><button className={e.isDelivered ? "btn btn-success" : "btn btn-primary"} onClick={() => {
                                        dispatch(deliver({ orderId: e._id }))
                                    }}>{e.isDelivered ? "Delivered" : " Not Delivered"}</button></td>

                                </tr>
                            })}

                        </tbody>
                    </table>

                </div>

            }


        </div>
    )
}

export default OrderAdmin
