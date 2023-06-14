import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getcart } from '../../redux/Cart'
import CartDispaly from './CartDispaly'
import Loader from '../loader/Loader'
import { Link } from 'react-router-dom'






function Cart() {
    let cond;
    let load;
    const dispatch = useDispatch()
    const { cart, status, total } = useSelector((state) => state.cart)

    const { user } = useSelector((state) => state.login)
    console.log(user)
    useEffect(() => {
        console.log("cart")
        dispatch(getcart(user._id))

    }, [user])
    console.log(cart)
    if (cart.length == 0) {
        cond = <div className='container'><div className='row'><div className='col-12'>
            <div className='text-center p-3'> <h3>Your Cart Is Empty!! </h3>
                <img src='cart.webp' className='w-100' style={{ height: "700px" }}></img>
                <Link to="/"><button className='btn'>CLICK HERE TO CHOOSE SOME DELICIOUS PIZZA!!</button></Link>
            </div></div></div></div>
    }


    console.log(cart)
    console.log(cart.price)
    if (status == "pending") {
        load = <Loader></Loader>
    }


    return (
        <> {status == "pending" ? load : cond ? cond : <div className='container'>

            <div className='row'>
                <div className='col-md-8 col-12'>
                    <div>

                        {cart.map((e, i) => {
                            return <CartDispaly data={e}></CartDispaly>
                        })}
                    </div>
                </div>

                <div className='col-md-4 col-12'>

                    <div>
                        <div class="card p-3">
                            <h1>  Summary</h1>

                            <div class="card-body">
                                Total Amount:<h1>{total}</h1>
                                Total Quantity:<h1>{cart.reduce((acc, cr) => acc + Number(cr.quantity), 0)}</h1>
                                <button className='btn btn-primary'>Checkout</button>

                            </div>
                        </div>
                    </div>

                </div>


            </div>

        </div>}
        </>
    )
}

export default Cart
