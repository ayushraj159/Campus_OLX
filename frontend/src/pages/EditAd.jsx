import React, { useEffect, useState, useRef, useReducer } from "react";
import './PostAd.css';
import { axios } from "../api";
import { CategoryData } from "../CategoryData";
import PageHeader from "../components/PageHeader";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { DropzoneArea } from "react-mui-dropzone";

export default function EditAd() {

    const { id } = useParams()

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        title: "",
        category: "",
        price: "",
        price_type: "",
        description: "",
        images: [],
    })

    const [files, setFiles] = useState([])


    const [loading, setLoading] = useState(false)



    useEffect(
        function fetchdata(){
            axios.get(`products/${id}`).then(response => response).then( response => {
                setInputs(response.data.data)
                const product = response.data.data;
                console.log("product: ", product)
                const initialFiles = []
                product.product_images.forEach((item) => {
                    initialFiles.push(item.image)
                })
                setInputs({
                    images: initialFiles,
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    price_type: (product.negotiable ? "negotiable" : "fixed"),
                    category: product.category,
                })
                setFiles(initialFiles);
                console.log(inputs)
            }
            );
        }

        , [])


    const header = {
        "Content-Type": "multipart/form-data"
    }


    function post() {
        toast("Creating new post...", {
            position: toast.POSITION.BOTTOM_RIGHT,
        });
        setLoading(true)
        var formData = new FormData()
        formData.append("title", inputs.title)
        formData.append("category", inputs.category)
        formData.append("price", inputs.price)
        formData.append("negotiable", inputs.price_type === "negotiable")
        formData.append("description", inputs.description)
        console.log(inputs.images)
        for (let i = 0; i <= inputs.images.length; i++) {
            if (i === inputs.images.length) {
                axios.patch(`products/${id}`, formData, header).then((response) => {
                    console.log("done");
                    setLoading(false)
                    console.log("ppr", formData);
                    navigate('/')
                })
                break;
            }
            formData.append("product_images", inputs.images[i])

        }

        console.log("posting");
        // console.log(inputs)
    }

    function handleChange(event) {
        const val = event.target.value;
        setInputs({
            ...inputs,
            [event.target.name]: val
        })

    }

    function handleFile(files) {
        // const val = event.target.files
        setInputs({
            ...inputs,
            images: files
        })
        console.log(inputs.images)
    }


    return (
        <>

            <PageHeader name="Edit Ad" />
            <div className="postad-wrapper">
                <div className="ad-info-input">
                    <div className="input-header">
                        Select Category
                    </div>
                    <div className="input-body">
                        <div className="label">
                            Category
                        </div>
                        <div className="input-input">

                            <select name='category' value={inputs.category} onChange={handleChange}>
                                <option selected>Select category</option>
                                {CategoryData.map((item, index) => {
                                    return (
                                        <option value={item.title}>{item.title}</option>
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
                            {/* {console.log(inputs.title)} */}
                            <input name="title" value={inputs.title} onChange={handleChange}></input>

                        </div>
                    </div>
                    <div className="input-body">
                        <div className="label">
                            Price
                        </div>
                        <div className="input-input">

                            <input name="price" type="number" value={inputs.price} onChange={handleChange}></input>

                        </div>
                    </div>
                    <div className="input-body">
                        <div className="label">
                            Price Type
                        </div>
                        <div className="input-input">

                            <select name="price_type" value={inputs.price_type} onChange={handleChange}>
                                <option selected>Select price type</option>
                                <option value='fixed'>Fixed</option>
                                <option value='negotiable'>Negotiable</option>

                            </select>

                        </div>
                    </div>
                    <div className="input-body">
                        <div className="label">
                            Description
                        </div>
                        <div className="input-input">

                            <textarea name="description" rows={10} style={{ resize: 'vertical' }} value={inputs.description} onChange={handleChange}></textarea>

                        </div>
                    </div>
                </div>
                <div className="ad-info-input">
                    <div className="input-header">
                        Images
                    </div>
                    <div className="input-body">
                        {/* <div className="label">
                            Upload Images
                        </div> */}
                        <div className="input-input" style={{ border: '2px dashed black' }}>

                            {/* <input name="images" type='file' className="choose-file" onChange={handleFile} files={inputs.images} multiple>

                        </input> */}

                            <DropzoneArea name="images"
                                initialFiles={files}
                                onChange={(files) => handleFile(files)}
                            />

                        </div>
                    </div>
                </div>
                {loading ? "" : <button className="submit-ad" onClick={post}>Submit</button>}
                <ToastContainer />
            </div>
        </>

    )
}