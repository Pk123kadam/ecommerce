import React from 'react';

import StripeCheckout from 'react-stripe-checkout';
import { useDispatch } from 'react-redux';
import { orderpost } from '../../redux/Order';






function CheckoutComponent({ grandTotal, currentUser, cartItems }) {

    const dispatch = useDispatch()




    function tokenHandler(token) {
        console.log(token);
        dispatch(orderpost({ token, grandTotal, currentUser, cartItems }))
    }

    return (
        <div>


            <StripeCheckout
                stripeKey='pk_test_51KtVxhSAIlAmsg9EbJcTcjdNkbfzYusjdZirZWYvKuf6zDwjPYQZWhhhnd173MeZzTEfk6nlexxDeGjVfTIhbRsz00zRgCAr28'
                amount={grandTotal * 100}
                shippingAddress
                token={tokenHandler}
                currency='INR' >

                <button className='btn text-light' style={{ backgroundColor: "#ff4d00" }}>Place Order</button>

            </StripeCheckout>

        </div>
    )
}
export default CheckoutComponent
