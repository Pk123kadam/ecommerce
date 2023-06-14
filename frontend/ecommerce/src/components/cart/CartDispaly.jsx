import React, { useEffect } from 'react'
import { cartDelete, getcart, updatecart } from '../../redux/Cart'
import { useDispatch } from 'react-redux'



import { useSelector } from 'react-redux'

function CartDispaly({ data }) {

    const dispatch = useDispatch()

    const { cart } = useSelector((state) => state.cart)
    console.log(cart.length)


    console.log(data.price)
    console.log(data._id, data.quantity)
    useEffect(() => {
        if (data.quantity == 0) {
            console.log("hii")
            dispatch(cartDelete(data))

        }


    }, [cart])



    return (

        <>
            <div style={{ boxShadow: "0 0 5px" }} className='p-5 mb-3'>



                <div className='d-md-flex gap-3'>
                    <div><h5>{data.name}</h5>

                        <h6>QUANTITY: <button className='btn btn-danger' onClick={() => {
                            dispatch(updatecart({ message: "decrement", data: data }))
                        }}>-</button> {data.quantity}  <button className='btn btn-primary' onClick={() => {
                            dispatch(updatecart({ message: "increment", data: data }))
                        }}> + </button></h6>
                        <h5>PRICE: {data.price}</h5></div>

                    <div> <img src={"http://localhost:8090/" + data.thumbnail} style={{ width: "200px", height: "200px" }}></img></div>
                </div>
                <div> <i class="bi bi-trash-fill text-danger" style={{ fontSize: "30px" }} onClick={() => {

                    dispatch(cartDelete(data))



                }}></i>
                </div>

            </div>
        </>

    )
}

export default CartDispaly
