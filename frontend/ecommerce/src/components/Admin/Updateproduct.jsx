import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { addburger } from '../../redux/addburger';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { updburger } from '../../redux/addburger';


function Updateproduct() {
    const { id } = useParams()

    const { burger, status } = useSelector((state) => state.burger)



    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [image, setimage] = useState(null);
    const [data, setdata] = useState({});
    const [arrayValues, setArrayValues] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8090/product/" + id, { withCredentials: true }).then((data) => {

            setdata({ ...data.data.user, ...data.data.user.prices[0] })
            setArrayValues(data.data.user.variants)
        })


    }, [])



    function handlesubmit(e) {
        e.preventDefault()


        // Setdata({
        //     ...data,
        //     prices: {
        //         small: data.smallPrice,
        //         large: data.largePrice
        //     }

        // })
        console.log(data)
        const formData = new FormData();
        if (data.name) {
            formData.append('name', data.name);
        }
        formData.append('small', data.small);
        formData.append('large', data.large);


        formData.append('category', data.category);
        formData.append('description', data.description);
        formData.append('image', image);
        arrayValues.forEach((value, index) => {
            formData.append(`array[${index}]`, value);
        });



        console.log(formData)
        dispatch(updburger({ data: formData, id: id }))

        setdata({
            name: "",
            description: "",
            category: "",
            small: "",
            large: ""
        })





    }

    function handlefilechange(event) {
        setimage(event.target.files[0]);
    }
    function handlechange(e) {
        setdata({ ...data, [e.target.name]: e.target.value })
    }
    function handleInputChange(event) {
        const { value } = event.target;
        // Split the input value by commas and trim each value
        const values = value.split(',').map((item) => item.trim());
        setArrayValues(values);

    }

    return (
        <div className='w-50 mx-auto'>
            <h1 className='text-center'>UPDATE PRODUCTS</h1>
            <form onSubmit={handlesubmit} method="post" enctype="multipart/form-data">
                <span className={status == "updated successfully" ? "text-primary" : "text-danger"}>{status}</span>


                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">name</label>
                    <input class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='name' value={data.name} onChange={handlechange} />

                </div>

                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">category</label>
                    <input type="text" class="form-control" id="exampleInputPassword1" name='category' value={data.category} onChange={handlechange} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">description</label>
                    <input type="text" class="form-control" id="exampleInputPassword1" name='description' value={data.description} onChange={handlechange} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">small</label>
                    <input type="number" class="form-control" id="exampleInputPassword1" name='smallPrice' value={data.small} onChange={handlechange} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">large</label>
                    <input type="number" class="form-control" id="exampleInputPassword1" name='largePrice' value={data.large} onChange={handlechange} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Variants</label>
                    <input type="text" class="form-control" value={arrayValues.join(', ')} onChange={handleInputChange} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">image</label>
                    <input type="file" class="form-control" id="exampleInputPassword1" name='image' onChange={handlefilechange} />
                </div>

                <div className='text-center mb-2'>   <button type="submit" class="btn btn-primary">UPDATE</button></div>

            </form>


        </div>
    )
}

export default Updateproduct
