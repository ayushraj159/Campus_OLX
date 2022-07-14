import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function Button() {
    const email = useSelector((state: RootState) => state.auth.email)
    const handleClick = () => {
        console.log(email);
        if(!email){
            toast(`Login to post ads`, {
                position: toast.POSITION.BOTTOM_RIGHT,
              })  
        }
    }
    return (
        <Link to={email ? 'post-ad' : '/'}>
            <button className='btn'><AiOutlinePlusCircle className='bi-plus' onClick={() => handleClick()}/> Submit Ad</button>
        </Link>
    );
}