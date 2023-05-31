import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { addburger } from '../../redux/addburger';
import { useSelector } from 'react-redux';
import axios from 'axios';


function Addproducts() {

    const { burger, status } = useSelector((state) => state.burger)


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [image, setimage] = useState(null);
    const [data, setdata] = useState({});
    const [arrayValues, setArrayValues] = useState([]);



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
        formData.append('name', data.name);
        formData.append('smallPrice', Number(data.smallPrice));
        formData.append('largePrice', Number(data.largePrice));


        formData.append('category', data.category);
        formData.append('description', data.description);
        formData.append('image', image);
        arrayValues.forEach((value, index) => {
            formData.append(`array[${index}]`, value);
        });
        console.log(formData)


        // fetch("http://localhost:8090/addProduct", {
        //     method: "POST",
        //     mode: 'cors',
        //     credentials: 'include',

        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json'
        //     },
        //     body: JSON.stringify(formData)

        // }

        // ).then((data) => {
        //     return data.json()
        // }).then((res) => {
        //     console.log(res)
        // })
        dispatch(addburger(formData))

        setdata({
            name: "",
            description: "",
            category: "",
            smallPrice: "",
            largePrice: ""
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
            <h1 className='text-center'>ADD PRODUCTS</h1>
            <form onSubmit={handlesubmit} method="post" enctype="multipart/form-data">
                <span className={status == "added successfully" ? "text-primary" : "text-danger"}>{status}</span>


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
                    <label for="exampleInputPassword1" class="form-label">smallPrice</label>
                    <input type="number" class="form-control" id="exampleInputPassword1" name='smallPrice' value={data.smallPrice} onChange={handlechange} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">largePrice</label>
                    <input type="number" class="form-control" id="exampleInputPassword1" name='largePrice' value={data.largePrice} onChange={handlechange} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Variants</label>
                    <input type="text" class="form-control" value={arrayValues.join(', ')} onChange={handleInputChange} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">image</label>
                    <input type="file" class="form-control" id="exampleInputPassword1" name='image' onChange={handlefilechange} />
                </div>

                <div className='text-center mb-2'>   <button type="submit" class="btn btn-primary">ADD</button></div>

            </form>


        </div>
    )
}

export default Addproducts
