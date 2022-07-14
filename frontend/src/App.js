import React , {useState} from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Home from './pages/Home';
import Category from './pages/Category';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Product from './pages/Product';
import PostAd from './pages/PostAd';
import EditAd from './pages/EditAd';
import { useSelector } from 'react-redux';
import { axios } from './api';
import MyAds from './pages/MyAds';
import Footer from './components/Footer';
import { toast, ToastContainer } from "react-toastify";

function App() {
    const email = useSelector((state: RootState) => state.auth.email)
    console.log(email)
    return (
        <div>
        <Router>

        <Navbar />
        <Routes >
            <Route path = '/' exact element = {<Home />} />
            <Route path = '/category' element = {<Category />} />
            <Route path = 'product/:id' element = {<Product />} />
            <Route path = '/post-ad' element = {<PostAd />} />
            <Route path = 'edit-ad/:id' element = {<EditAd />} />
            <Route path = '/my-ads' element = {<MyAds />} />
        </Routes>
        </Router>
        <ToastContainer />
        <Footer />
        </div>
    );
}



export default App;
