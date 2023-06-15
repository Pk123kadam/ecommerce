

import './App.css'
import "bootstrap-icons/font/bootstrap-icons.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { Provider } from 'react-redux'
import { store } from './redux/store'

import Navbar from './components/navbar/navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './components/signup/Signup'
import Register from './components/Register/Register';
import Admin from './components/Admin/Admin'
import Home from './components/home/Home'

import Addproducts from './components/Admin/Addproducts'
import Users from './components/Admin/Users'
import Updateusers from './components/Admin/Updateusers'
import Profile from './components/profile/Profile'
import UpdateProfile from './components/profile/UpdateProfile'
import Cart from './components/cart/Cart'
import Products from './components/Admin/Products'
import Updateproduct from './components/Admin/Updateproduct'
import Dashboard from './components/dashboard/Dashboard'
import OrderAdmin from './components/Admin/OrderAdmin'



function App() {


  return (
    <>

      <div className='body'>
        <Provider store={store}>

          <BrowserRouter >
            <Navbar></Navbar>

            <Routes>

              <Route path='/home' element={<Home></Home>}></Route>
              <Route path='/login' element={<Signup></Signup>}></Route>

              <Route path='/addproduct' element={<Addproducts></Addproducts>}></Route>
              <Route path='/updateproduct/:id' element={<Updateproduct></Updateproduct>}></Route>

              <Route path='/cart' element={<Cart></Cart>}></Route>
              <Route path='/updateprofile/:id' element={<UpdateProfile></UpdateProfile>}></Route>
              <Route path='/profile/:id' element={<Profile></Profile>}></Route>
              <Route path='/updateusers/:id' element={<Updateusers></Updateusers>}></Route>



              <Route path='/' element={<Admin></Admin>}>
                <Route path='/product' element={<Products></Products>}></Route>
                <Route path='/users' element={<Users></Users>}></Route>
                <Route path='/order' element={<OrderAdmin></OrderAdmin>}></Route>




              </Route>
              <Route path='/register' element={<Register></Register>}></Route>

            </Routes>
          </BrowserRouter>
        </Provider>

      </div>




    </>
  )
}

export default App
