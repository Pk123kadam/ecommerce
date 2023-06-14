import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { delburger, getburger } from '../../redux/addburger'
import Loader from '../loader/Loader'

function Products() {
    let load;
    const dispatch = useDispatch()
    const { burger, status } = useSelector((state) => state.burger)
    useEffect(() => {
        dispatch(getburger())

    }, [])
    if (status == "pending") {
        load = <Loader></Loader>
    }
    return (
        <div className='container'>
            {load}

            <Link to="/addproduct">  <button className='btnb btn-primary'>ADD PRODUCT</button></Link>
            <div className='table-responsive'>

                <table class="table ">
                    <thead>
                        <tr>
                            <th scope="col">sr no</th>
                            <th scope="col">image   </th>
                            <th scope="col">name</th>
                            <th scope="col">category</th>
                            <th scope="col">actions</th>

                        </tr>
                    </thead>
                    <tbody>

                        {burger.map((e, i) => {
                            return <tr key={i}>
                                <th scope="row">{i + 1}</th>
                                <td>   <img src={`http://localhost:8090/${e.image}`} className='rounded-circle' style={{ width: "100px", height: "100px" }}></img></td>
                                <td>{e.name}</td>
                                <td>{e.category}</td>
                                <td><Link to={`/updateproduct/${e._id}`}><button className='btn btn-primary'>UPDATE</button></Link></td>
                                <td><button className='btn btn-danger' onClick={() => dispatch(delburger(e._id))
                                }>DELETE</button></td>

                            </tr>
                        })}

                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default Products
