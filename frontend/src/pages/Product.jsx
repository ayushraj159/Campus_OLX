import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './Product.css';
import { axios } from "../api";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/bundle";
import 'swiper/css/pagination';

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";

import ad1 from '../images/ad1.png'
import { FaUserCircle } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi"
import { FaWhatsapp } from "react-icons/fa";
import { BiTime } from "react-icons/bi";
import { BiCategory } from "react-icons/bi";
import Loading from "../components/Loader";
import timeSince from "../time";

export default function Product() {

    const [ad, setAd] = useState([]);
    var [loaderState, setLoaderState] = useState(true);
    const [slider, setSlider] = useState()
    const [thumbs, setThumbs] = useState()
    const { id } = useParams()

    const fetchData = async () => axios.get(`products/${id}`).then((response) => {
        setAd(response.data.data, () => console.log(ad));
        const images = response.data.data.product_images;
        console.log(response.data.data)
        setSlider(() => images.map((item, key) => {
            console.log(images)
            return (
                <SwiperSlide>
                    <div className="slider-image">
                        <div className="blurred">
                            <img src={item["image"]} alt=""></img>

                        </div>
                        <img src={item["image"]} alt=""></img>
                    </div>



                </SwiperSlide>
            )
        }), setLoaderState(false));

    }).catch((error) => {
        if (error.response) {
            console.log(error.response);
        }
    });






    useEffect(() => {
        fetchData();
    }, [])


    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const to_render = function () {

        return (

            <div className="product-wrapper">
                <div className="product-header">
                    {ad.title}
                </div>

                <div className="product-body">
                    <div className="carausal">

                        <Swiper
                            style={{
                                "--swiper-navigation-color": "#fff",
                                "--swiper-pagination-color": "#fff",
                            }}
                            spaceBetween={10}
                            navigation={
                                {
                                    clickable: true,
                                    prevEl: '#prevcat',
                                    nextEl: '#nextcat',
                                }
                            }
                            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper2"

                        >


                            {slider}
                        </Swiper>
                        <Swiper
                            onSwiper={setThumbsSwiper}
                            spaceBetween={10}

                            slidesPerView={4}
                            freeMode={true}
                            watchSlidesProgress={true}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper"


                        >
                            {slider}

                        </Swiper>
                        <div className="product-bottom">
                            <div className="product-desc">
                            <div className="desc1">
                                <span style={{display: "flex"}}><BiCategory className="icon" style={{marginLeft:"0px"}} />{ad.category}</span>
                                <span style={{display: "flex"}}><BiTime className="icon"/>{timeSince(new Date(ad.posted_on))} ago</span>
                            </div>
                                <h2 style={{marginTop: "10px"}}>Description</h2>
                                <p>
                                    {ad.description}
                                </p>
                            </div>
                            <div className="ad-action">

                            </div>
                        </div>
                    </div>
                    <div className="product-info">
                        <div className="price"> &#x20B9; {ad.price}</div>
                        <div className="owner-info">
                            <span>Ad Owner</span>
                            <div className="owner-name">
                                <FaUserCircle className="user-icon" />
                                <span style={{verticalAlign:"sub"}}>{ad.owner_name}</span><br />
                                <span style={{ fontSize: "0.7rem", verticalAlign: "top" }}>{ad.owner_department}</span>
                            </div>
                            <div className="contact">
                                <a href={"tel:" + ad.owner_contact}>

                                    <div className="owner-contact">
                                        <FiPhoneCall className="call" /> Call
                                    </div>
                                </a>
                                <a href={"https://wa.me/" + ad.owner_contact}>

                                    <div className="owner-contact" >
                                        <FaWhatsapp className="call" /> Message
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

    return (
        <>
            {loaderState ? <Loading /> : to_render()}
        </>

    )
}