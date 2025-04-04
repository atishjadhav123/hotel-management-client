import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './componants/Home'
import Register from './peges/Register'
import Login from './peges/Login'
import AdminLayout from './componants/admin/AdminLayout copy'
import AddCategory from './peges/Addcategori'
import Getcategory from './peges/Getcategory'
import CategoryDetail from './peges/CategoryDetail'
import Brands from './peges/Brands'
import Footer from './peges/Footer'
import Booking from './peges/booking/Booking'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import AdminProtected from './share/AdminProtected'


const App = () => {
  return <>
    <ToastContainer />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/detail/:id" element={<CategoryDetail />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/booking" element={<Booking />} />

        <Route path="/admin" element={<AdminProtected compo={<AdminLayout />} />}>
          <Route index element={<h1>Admin Dashboard</h1>} />
          <Route path="addcategori" element={<AddCategory />} />
          <Route path="getcategory" element={<Getcategory />} />
        </Route>
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  </>
}

export default App;
