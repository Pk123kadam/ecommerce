import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getburger } from '../../redux/addburger'
import { addcart } from '../../redux/Cart'

function DisplayProduct({ data, index }) {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.login)
    const { cart } = useSelector((state) => state.cart)

    const [Variant, setVariant] = useState(data.variants[0])
    const [quantity, setQuantity] = useState(1);




    return (







        <div className='col' >

            <div style={{ padding: "20px", height: "600px" }} className='border'>

                <div className='text-center'>
                    <div className='w-50 mx-auto'><img src={`http://localhost:8090/${data.image}`} className='w-100 h-100'></img></div>
                    <h6>{data.name}</h6>
                    <h6>{data.category}</h6>
                    <h6>{data.description}</h6>
                    <select className='form-control' value={Variant} onChange={(ev) => { setVariant(ev.target.value) }}>
                        {data.variants.map((v) => {
                            return <option value={v}> {v} </option>
                        })}
                    </select>


                </div>

                <div className='w-100 m-1'>
                    <p>Quantity:</p>
                    <select className='form-control' value={quantity} onChange={(e) => { setQuantity(e.target.value) }}>
                        {[...Array(10).keys()].map((x, i) => {

                            return <option value={i + 1}> {i + 1} </option>
                        })}
                    </select>
                    <h6>  prices:{data.prices[0][Variant] * quantity}</h6>
                </div>

                {/* <h6>{e.prices.map((e) => e)}</h6> */}
                {cart.find((e) => e.id == index + 1) ? <div className='text-center'><button className='btn btn-primary'>ADD TO CART</button></div> : <div className='text-center'><button className='btn btn-primary' onClick={() => {
                    dispatch(addcart({ name: data.name, price: data.prices[0][Variant] * quantity, quantity: quantity, userID: user._id, thumbnail: data.image, id: index + 1 }))

                }}>ADD TO CART</button></div>}



            </div>


        </div>








    )
}

export default DisplayProduct
