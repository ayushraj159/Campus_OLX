import React, {useEffect, useState} from "react";

import './AdCard.css';
import ad1 from '../images/ad1.png';
import {BiCategoryAlt, BiTime} from 'react-icons/bi'
import {MdOutlineDelete,MdModeEditOutline} from 'react-icons/md'

import { Link, useNavigate } from "react-router-dom";
import AlertDialog from "./AlertDialog";

import { axios } from "../api";
import EditAd from "../pages/EditAd";





export default function AdCard({image, category, title, price, negotiable, posted_on, editable, id}){
    const navigate = useNavigate()
    const [dialogState, setDialogState] = useState(false)
    const [dialogResponse, setDialogResponse] = useState(false)
    useEffect(
        () => {
            if(dialogResponse){
                axios.delete(`products/${id}`).then((response) => {
                    console.log("done");
                    console.log("deleted successfully ", id)
                    navigate('/my-ads')
                    // setLoading(false)                   
                  })
            }

        }, [dialogResponse]
    )

    return (
        <div className="ad-card">
            <div className="ad-card-image" >
                {negotiable && <div className="negotiable">NEGOTIABLE</div>}
                <div className="blur-bg">            
                    <img src={image} alt=''/>
                </div>
                <img src={image} alt=''/>
                {
                    editable && 

                    <div className="editable">
                        <Link to = {`/edit-ad/${id}`}>
                        <div className="edit">
                            <MdModeEditOutline />
                        </div>
                        </Link>
                        <div onClick={() => setDialogState(true)}  className="delete"><MdOutlineDelete /></div>
                    </div>

                }
                <AlertDialog content="Are you sure to delete this ?" state = {dialogState} backedState = {setDialogState} response = {setDialogResponse}/>

            </div>

            <div className="ad-card-desc">
                <div className="desc1">
                    <span>{category}</span>
                    <span style={{display: "flex"}}><BiTime className="icon"/>{posted_on} ago</span>
                </div>

                <div className="desc2">
                    <Link to = {`/product/${id}`} >
                        {title}
                    </Link>
                </div>
                <div className="desc3">
                    <span>&#x20B9; {price}</span>
                    <span></span>
                </div>
            </div>

        </div>
    )
}