import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getburger } from '../../redux/addburger'
import DisplayProduct from './DisplayProduct'
import Loader from '../loader/Loader';

function Home() {
    let load;

    useEffect(() => {
        console.log("ko")
        dispatch(getburger())


    }, [])



    const dispatch = useDispatch()
    const data = useSelector((state) => state.burger)
    console.log(data)
    console.log(data.filtered)

    if (data.status == "pending") {
        console.log("load")

        load = <Loader></Loader>
    }
    return (
        <>
            <div className='container'>
                <div className='row row-cols-lg-3 row-cols-md-2 row-cols-1 gy-3'>
                    {load}
                    {
                        data.filtered.map((datas, i) => {
                            return (<DisplayProduct data={datas} index={i}></DisplayProduct>)
                        })
                    }
                </div>

            </div>
        </>
    )
    // const [Variant, setVariant] = useState("smallPrice")
    // const [quantity, setQuantity] = useState(1);


    // console.log(data.burger)
    // if (data.status == "pending") {

    //     load = <h1>loading...</h1>
    // }

    // return (
    //     <div className='container'>

    //         <div className='row row-cols-lg-3 row-cols-md-2 row-cols-1'>

    //             {data.burger.map((e, i) => {


    //                 return <div className='col rounded-2' style={{ boxShadow: "0 0 9px" }}>
    //                     <div style={{ padding: "20px", height: "900px" }}>
    //                         <div className='w-50 mx-auto'><img src={`http://localhost:8090/${e.image}`} className='w-100 h-100'></img></div>
    //                         <div className='text-center'><h1>{e.name}</h1>
    //                             <h1>{e.category}</h1>
    //                             <h1>{e.description}</h1>
    //                             <select className='form-control' value={Variant} onChange={(ev) => { setVariant(ev.target.value) }}>
    //                                 {e.variants.map((v) => {
    //                                     return <option value={v}> {v} </option>
    //                                 })}
    //                             </select>


    //                         </div>

    //                         <div className='w-100 m-1'>
    //                             <p>Quantity:</p>
    //                             <select className='form-control' value={quantity} onChange={(e) => { setQuantity(e.target.value) }}>
    //                                 {[...Array(10).keys()].map((x, i) => {
    //                                     console.log(x, i)
    //                                     return <option value={i + 1}> {i + 1} </option>
    //                                 })}
    //                             </select>
    //                         </div>
    //                         prices:{e.prices[0][Variant] * quantity}
    //                         {/* <h1>{e.prices.map((e) => e)}</h1> */}

    //                     </div>

    //                 </div>


    //             })}
    //             {load}


    //         </div>
    //     </div>
    // )
}

export default Home
