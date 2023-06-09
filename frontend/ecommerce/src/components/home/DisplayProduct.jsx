import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getburger } from '../../redux/addburger'
import { addcart, getcart } from '../../redux/Cart'
import { Link } from 'react-router-dom'

function DisplayProduct({ data, index }) {

    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.login)
    const { cart, status } = useSelector((state) => state.cart)





    console.log(cart)

    console.log(status)

    const [Variant, setVariant] = useState(data.variants[0])
    const [quantity, setQuantity] = useState(1);
    console.log(data.prices[0][Variant])
    const [i, setindex] = useState(null)
    useEffect(() => {
        console.log(user._id)
        dispatch(getcart(user._id))


    }, [])
    console.log(quantity)





    return (







        <>
            <div className='col' >

                <div style={{ padding: "20px", height: "600px" }} className='border d-flex flex-column gap-4'>

                    <div className='text-center'>
                        <h4>{data.name}</h4>
                        <h5 className={data.category == "veg" ? "text-success" : "text-danger"} style={{ fontWeight: "bolder" }}>{data.category}</h5>

                        <a href='#'>  <div style={{ height: "300px" }}><img src={`http://localhost:8090/${data.image}`} className='w-100 h-100' data-bs-toggle="modal" data-bs-target={`#exampleModal${index}`}></img></div></a>








                    </div>
                    <div className='d-flex flex-wrap  justify-content-between align-items-center text-center'>
                        <div style={{ width: "40%" }} className='mb-4'>
                            <p>Sizes:</p>
                            <select className='form-control' value={Variant} onChange={(ev) => { setVariant(ev.target.value) }}>
                                {data.variants.map((v) => {
                                    console.log(v)
                                    return <option value={v}> {v} </option>
                                })}
                            </select>

                        </div>

                        <div style={{ width: "40%" }} className='mb-4'>
                            <p>Quantity:</p>
                            <select className='form-control' value={quantity} onChange={(e) => { setQuantity(e.target.value) }}>
                                {[...Array(10).keys()].map((x, i) => {

                                    return <option value={i + 1}> {i + 1} </option>
                                })}
                            </select>

                        </div>
                        <h5>  price:{data.prices[0][Variant] * quantity}</h5>
                        {/* <h6>{e.prices.map((e) => e)}</h6> */}
                        {status == "unauthorized" ? <div className='text-center'><Link to="/login"><button className='btn' style={{ backgroundColor: "#ff4d00", color: "white" }}>ADD PIZZA</button></Link></div> : <div className='text-center'><button className='btn' style={{ backgroundColor: "#ff4d00", color: "white" }} onClick={() => {
                            dispatch(addcart({ name: data.name, price: data.prices[0][Variant] * quantity, variant: Variant, quantity: quantity, userID: user._id, thumbnail: data.image, id: index + 1, single: Number(data.prices[0][Variant]) }))



                        }}>ADD PIZZA</button></div>}

                    </div>




                </div>


            </div>
            <div class="modal fade" id={`exampleModal${index}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content border">
                        <div class="modal-header">
                            <h5 class="modal-title w-100 text-center" id="exampleModalLabel">{data.name}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body w-100" >
                            <div style={{ height: "500px", width: "100%" }}>
                                <img src={`http://localhost:8090/${data.image}`} className='w-100 h-100'></img>

                            </div>
                            <p className='mt-4' style={{ whiteSpace: "normal", wordBreak: "break-all" }}>{data.description}</p>

                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                        </div>
                    </div>
                </div>
            </div>
        </>







    )
}

export default DisplayProduct
