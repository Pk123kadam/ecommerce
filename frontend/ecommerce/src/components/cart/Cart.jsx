import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getcart } from '../../redux/Cart'
import CartDispaly from './CartDispaly'






function Cart() {
    let cond;
    const dispatch = useDispatch()
    const { cart, status, total, price } = useSelector((state) => state.cart)
    console.log(price)
    const { user } = useSelector((state) => state.login)
    useEffect(() => {
        console.log("cart")
        dispatch(getcart(user._id))

    }, [user])
    console.log(cart)
    if (cart.length == 0) {
        cond = <h1>no orders</h1>
    }

    console.log(total)


    return (
        <div className='container'>
            <div className='row'>
                {cart.map((e, i) => {
                    return <CartDispaly data={e}></CartDispaly>
                })}
                <div className='col-4'>
                    <div style={{ boxShadow: "0 0 5px" }} className='text-center p-5'>       <h1>GRAND TOTAL :{total} </h1></div>

                </div>
                {cond}

            </div>

        </div>
    )
}

export default Cart
