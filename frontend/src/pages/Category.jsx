import React, { useState, useEffect } from "react";
import './Category.css';
import { axios } from "../api";
import AdCard from "../components/AdCard";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { CategoryData } from "../CategoryData";

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import PageHeader from "../components/PageHeader";
import timeSince from "../time";
import Drawer from '@mui/material/Drawer';
import {AiFillFilter} from "react-icons/ai"
import Loading from "../components/Loader";


export default function Category() {

    const [isMobile, setMobile] = useState(window.innerWidth < 960);
    const updateScreen = () => {
      setMobile(window.innerWidth < 960);
    };
  
    useEffect(() => {
        window.addEventListener("resize", updateScreen);
        return () => window.removeEventListener("resize", updateScreen);

    }, []);



    const location = useLocation()
    const { cat } = location.state
    const { kw } = location.state

    const [category, setCategory] = useState([cat])
    const [keyword, setKeyword] = React.useState(kw)
    const [loader, setLoader] = useState(true)

    const [ads, setAds] = useState([]);

    const [price, setPrice] = React.useState([0, 10000]);

    const handlePrice = (event, newValue) => {
        setPrice(newValue);
    };

    const filter = () => {
        axios.get('products/', {
            params: {
                category: category.join(','),
                price_from: price[0],
                price_to: price[1],
                keyword: keyword
            }
        }).then((response) => {
            setAds(response.data.data);
            console.log(ads);
            setLoader(false)

        }).catch((error) => {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        });
        setDrawerOpen(false)
        console.log(category)
    }

    const handleCategory = (e) => {

        var array = [...category]; // make a separate copy of the array
        var index = array.indexOf(e.target.value)
        if (index !== -1) {
            array.splice(index, 1);
        }
        else {
            array.push(e.target.value);
        }

        setCategory(array);


        console.log(category)
    }

    useEffect(() => {


        axios.get('products/', {
            params: {
                category: (category.length > 0 ? category[0] : ""),
                keyword: keyword
            }

        }).then((response) => {
            setAds(response.data.data);
            console.log(response.data.data);
        }).catch((error) => {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        });
    }, [])



    const filterOptions = (
        <div className="category-leftdiv">
            <span>Filter Ads</span>
            <div>
                <span className="filter-type">Keyword</span>
                <input className="filter-input-field" id="keyword" value={keyword} placeholder="Search for..." onChange={(e) => setKeyword(e.target.value)}></input>
            </div>
            <div>
                <span className="filter-type">Category</span>
                <div className="category-checkboxes">
                    <FormGroup>
                        {CategoryData.map((item) => {
                            return (
                                <FormControlLabel control={<Checkbox checked={category.includes(item.title)} value={item.title} onChange={handleCategory} />} label={item.title} />
                            )
                        })}
                    </FormGroup>


                    {/* <div className="checkbox">
                <input type="checkbox" id="electronics">
                </input>
                <label for="electronics">
                    Electronics
                </label>
            </div> */}

                </div>
            </div>
            <div>
                <span className="filter-type">Price</span>
                <Box>
                    <Slider
                        min={0}
                        max={10000}
                        value={price}
                        onChange={handlePrice}
                        step={100}
                    />
                </Box>
                <div className="price-fields">
                    <input className="filter-input-field" id="min" placeholder="min" value={price[0]} onChange={(e) => setPrice((price) => [e.target.value, price[1]])}></input>
                    <input className="filter-input-field" id="max" placeholder="max" value={price[1]} onChange={(e) => setPrice((price) => [price[0], e.target.value])}></input>
                </div>
            </div>
            <button className="apply-filter" onClick={filter}>
                APPLY FILTER
            </button>

        </div>
    )
    
    const [drawerOpen, setDrawerOpen] = useState(false)
    const toggleDrawer = () => {
        setDrawerOpen(false);
    }
    const filterDrawer = (
        <Drawer
            anchor={"left"}
            open={drawerOpen}
            onClose={toggleDrawer}
      >
        {filterOptions}
      </Drawer>
    )

    


    return (
        <>
            <PageHeader name="Products" navigation="" />

            {isMobile && <div className="filter-toggler" onClick={() => setDrawerOpen(true)}><AiFillFilter/></div>}
            <div className="category-wrapper">
                {isMobile ? filterDrawer : filterOptions}

                <div className="category-rightdiv">
                    <div className="category-right-top">

                        <span>Showing {ads.length === 0 ? 0 : 1} - {ads.length} of {ads.length} ad{ads.length > 1 ? 's' : ''} found</span>
                    </div>
                    <div className="category-right-body">

                        {ads.map((item, index) => {
                            var d = timeSince(new Date(item.posted_on))
                            return (
                                <Link to={`/product/${item.id}`}>
                                    <AdCard image={(item.product_images.length > 0 ? item.product_images[0].image :
                                    "")} category={item.category} title={item.title} price={item.price} posted_on={d} />
                                </Link>
                            )
                        })}
                        {ads.length === 0? (<center>No Ads found</center>) : ""}
                        {/* {loader ? <Loading /> : ""} */}
                    </div>

                </div>

            </div>
        </>

    )
}