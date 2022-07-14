import React, {useEffect, useState, useRef} from "react";
import './PostAd.css';
import { axios } from "../api";
import { CategoryData } from "../CategoryData";
import PageHeader from "../components/PageHeader";
import { useNavigate } from "react-router-dom";
import {DropzoneArea} from 'react-mui-dropzone';
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';

export default function PostAd() {
    const email = useSelector((state: RootState) => state.auth.email)
    
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        title: "",
        category: "",
        price: "",
        price_type: "",
        description: "",
        images: []
    })
    const [files, setFiles] = useState([])


    const [loading, setLoading] = useState(false)



    const header = {
        "Content-Type": "multipart/form-data"
    }

    
    function post(e){
        console.log(inputs);
        e.preventDefault();
        if(!email){
            toast(`You must login to post ad`, {
                position: toast.POSITION.BOTTOM_RIGHT,
              })  
            return;
        }
        for(var key in inputs){
            if(inputs[key] === ""){
                toast(`${key} is required`, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                  })  
                return;
            }
            if(inputs.images.length === 0){
                toast(`Image is required`, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                  })  
                return;
            }
        }
        setLoading(true)
        var formData = new FormData()
        formData.append("title", inputs.title)
        formData.append("category", inputs.category)
        formData.append("price", inputs.price)
        formData.append("negotiable", inputs.price_type === "negotiable")
        formData.append("description", inputs.description)
        console.log(inputs.images)
        for (let i = 0; i <= inputs.images.length; i++) {
            if(i === inputs.images.length){
                axios.post('products/', formData, header).then((response) => {
                    console.log("done");
                    setLoading(false)
                    console.log(formData.get("product_images"));
                    navigate('/')
                }).then((res) => {
                    toast("Adding your ad...", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                      });
                    }).catch((e) => {
                        toast("Some error occured...", {
                            position: toast.POSITION.BOTTOM_RIGHT,
                          });       
                  })
                break;
            }
            formData.append("product_images", inputs.images[i])
            
        }
        
        console.log("posting");
        // console.log(inputs)
    }

    function handleChange(event){
        const val = event.target.value;
        setInputs({
            ...inputs,
            [event.target.name]: val
        })

    }

    function handleFile(files){
        // const val = event.target.files
        setInputs({
            ...inputs,
            images: files
        })
        console.log(inputs.images)
    }


    return (
        <>

        <PageHeader name="Submit Ad"/>
        <form className="postad-wrapper">
            <div className="ad-info-input">
                <div className="input-header">
                    Select Category
                </div>
                <div className="input-body">
                    <div className="label">
                        Category
                    </div>
                    <div className="input-input">

                        <select name='category' value={inputs.category} onChange={handleChange} required>
                        <option selected>Select category</option>
                            {CategoryData.map((item, index) => {
                                return(
                                    <option value = {item.title}>{item.title}</option>
                                )
                            })}
 
                        </select>
                    </div>
                </div>
            </div>
            <div className="ad-info-input">
                <div className="input-header">
                    Product Information
                </div>
                <div className="input-body">
                    <div className="label">
                        Title
                    </div>

                    <div className="input-input">

                        <input name="title" value={inputs.title} onChange={handleChange} required></input>

                    </div>
                </div>
                <div className="input-body">
                    <div className="label">
                        Price
                    </div>
                    <div className="input-input">

                        <input name="price" type="number" value={inputs.price} onChange={handleChange} required></input>

                    </div>
                </div>
                <div className="input-body">
                    <div className="label">
                        Price Type
                    </div>
                    <div className="input-input">

                        <select name="price_type" value={inputs.price_type} onChange={handleChange} required>
                        <option selected>Select price type</option>
                        <option value='fixed' selected>Fixed</option>
                        <option value='negotiable'>Negotiable</option>

                        </select>

                    </div>
                </div>
                <div className="input-body">
                    <div className="label">
                        Description
                    </div>
                    <div className="input-input">

                        <textarea name="description" rows={10} style={{ resize: 'vertical' }} value={inputs.description} onChange={handleChange} required></textarea>

                    </div>
                </div>
            </div>
            <div className="ad-info-input">
                <div className="input-header">
                    Images
                </div>
                <div className="input-body">
                    <div className="label">
                        Upload Images
                    </div>
                    <div className="input-input" >

                        {/* <input name="images" type='file' className="choose-file" onChange={handleFile} files={inputs.images} multiple> */}
                        <DropzoneArea name="images"
                            onChange={(files) => handleFile(files)}
                            required />

                        {/* </input> */}
                    </div>
                </div>
            </div>
            {loading ? "" : <button type="submit" className="submit-ad" onClick={post}>Submit</button>}
            <ToastContainer />
        </form>
    </>

    )
}