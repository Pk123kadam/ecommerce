

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



function App() {


  return (
    <>

      <Provider store={store}>

        <BrowserRouter >
          <Navbar></Navbar>
          <Routes>

            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/login' element={<Signup></Signup>}></Route>
            <Route path='/addproduct' element={<Addproducts></Addproducts>}></Route>
            <Route path='/users' element={<Users></Users>}></Route>
            <Route path='/cart' element={<Cart></Cart>}></Route>
            <Route path='/updateprofile/:id' element={<UpdateProfile></UpdateProfile>}></Route>
            <Route path='/profile/:id' element={<Profile></Profile>}></Route>
            <Route path='/updateusers/:id' element={<Updateusers></Updateusers>}></Route>



            <Route path='/admin' element={<Admin></Admin>}></Route>
            <Route path='/register' element={<Register></Register>}></Route>

          </Routes>
        </BrowserRouter>
      </Provider>





    </>
  )
}

export default App
