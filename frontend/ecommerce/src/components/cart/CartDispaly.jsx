import React, { useEffect } from 'react'
import { cartDelete, getcart, updatecart } from '../../redux/Cart'
import { useDispatch } from 'react-redux'



import { useSelector } from 'react-redux'

function CartDispaly({ data }) {

    const dispatch = useDispatch()

    const { cart, price } = useSelector((state) => state.cart)
    console.log(cart.length)
    console.log(cart)




    return (
        <div className='col-8 gy-4'>
            <div className='d-flex gap-5 p-4' style={{ boxShadow: " 0 0 5px" }}>
                <div><h5>{data.name}</h5>
                    {data.amount}
                    <h6>QUANTITY: <button className='btn btn-danger' onClick={() => {
                        dispatch(updatecart({ message: "decrement", data: data }))
                    }}>-</button> {data.quantity} <button className='btn btn-primary' onClick={() => {
                        dispatch(updatecart({ message: "increment", data: data, price: price }))
                    }}>+</button></h6>
                    <h5>PRICE: {data.price}</h5></div>
                <div> <img src={"http://localhost:8090/" + data.thumbnail} className='w-75'></img></div>
                <div> <button className='btn btn-danger' onClick={() => {

                    dispatch(cartDelete(data))



                }}>DELETE</button>
                </div>
            </div>


        </div>
    )
}

export default CartDispaly
