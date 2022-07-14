import React from "react";
import { useEffect, useState } from "react";
import './Home.css';
import CategorySlider from "../components/CategorySlider";
import AdCard from "../components/AdCard";
import { axios } from "../api.js";
import { Link } from 'react-router-dom';
import { CategoryData } from "../CategoryData";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Loading from "../components/Loader";
import timeSince from "../time";


export default function Home() {
    const [ads, setAds] = useState([]);
    const [category, setCategory] = useState("")
    const [keyWord, setKeyword] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(
    
        () => {
        setLoading(true)
        axios.get('products/').then((response) => {
            setAds(response.data.data);
            console.log(response.data.data);
            setLoading(false)
        }).catch((error) => {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        });
    }, [])


    return (
        
        <>
            <div className="home-wrapper">
                <div className="home-hero">
                    <span>All You Need Is Here & Classified</span>
                    <span>Browse from more than <b>15,000,000</b> adverts while new ones come on daily bassis</span>
                    <div className="search">

                        <input className="search-box" placeholder="Search for" value={keyWord} onChange={(e) => setKeyword(e.target.value)} />
                        <select className="category-search" onChange={(e) => setCategory(e.target.value)}>
                            <option selected disabled><span>in Category</span></option>
                            {CategoryData.map((item) => {
                                return (
                                    <option value={item.title}>{item.title}</option>
                                )
                            })}
                        </select>
                        <Link to={'category'} state={{ cat: category, kw: keyWord }} style={{ textDecoration: "none" }}>
                            <button className="hero-btn-search">
                                Search
                            </button>
                        </Link>
                    </div>

                </div>
                <CategorySlider />
        {
            loading ?
            <Loading />
            :
                <div className="home-ads">
                    {ads.map((item, index) => {
                        var d = timeSince(new Date(item.posted_on));
                        console.log(d)
                        
                        return (
                            <Link to={`/product/${item.id}`}>
                                <AdCard image={(item.product_images.length > 0 ? item.product_images[0].image :
                                    "")} category={item.category} title={item.title} price={item.price} posted_on={d} negotiable = {item.negotiable} link = {`/product/${item.id}`}/>
                            </Link>
                        )
                    })}
                    {/* {console.log(ads)} */}

                </div>
        }
            </div>
        </>
    )
}