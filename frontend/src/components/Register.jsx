import React, {useState, useHistory, useEffect} from "react";
import { Divider } from "@mui/material";
import './Auth.css';
import { axios } from "../api";
import { open_login } from "../store/slices/authModalSlice";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { closeAll, open_register } from "../store/slices/authModalSlice";




export default function Register(){

    const dispatch = useDispatch()

	const initialFormData = Object.freeze({
		email: '',
		username: '',
		password: '',
        department: '',
        mobile_number: '',
        hostel: '',
	});

	const [formData, updateFormData] = useState(initialFormData);

	const handleChange = (e) => {
		updateFormData({
			...formData,
			// Trimming any whitespace
			[e.target.name]: e.target.value.trim(),
		});
	};
    useEffect(
        () => {
            updateFormData(initialFormData)
        }
    , [])
	const handleSubmit = (e) => {
		e.preventDefault();
        // e.checkValidity();
        console.log(e)
		console.log(formData);
        for(var key in formData){
            if(formData[key] === ""){
                toast(`${key} is required`, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                  })  
                return;
            }
        }

		axios
			.post(`user/create/`, {
				email: formData.email,
				user_name: formData.username,
				password: formData.password,
                department: formData.department,
                mobile_number: formData.mobile_number,
                hostel: formData.hostel
			})
			.then((res) => {
                toast("Please check your mail id to verify your email", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                  });
				console.log(res);
				console.log(res.data);
                updateFormData(initialFormData)
                dispatch(closeAll())
			}).catch((e) =>{
                toast("Some error occured", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                  })  

            }
            );
	};

    return (
        <form className="auth-wrapper">
        
        <h2>Register</h2>
            <div className='login-form'>
                <div className='login-form-field'>
                    <p>Username</p>
                    <input onChange={handleChange} name='username' id='username' required></input>
                </div>
                <div className='login-form-field'>
                    <p>Email</p>
                    <input onChange={handleChange} name='email' id='email' type='email' required></input>
                </div>

            </div>
            <div className='login-form'>
                <div className='login-form-field'>
                    <p>Password</p>
                    <input value={formData.password} onChange={handleChange} name='password' id='password' type='password' required></input>
                </div>
                <div className='login-form-field'>
                    <p>Department</p>
                    <input value={formData.department} type='text' onChange={handleChange} name='department' id='department'></input>
                </div>

            </div>
            <div className='login-form'>
                <div className='login-form-field'>
                    <p>Contact Number</p>
                    <input value={formData.mobile_number} onChange={handleChange} name='mobile_number' id='mobile_number' type='number' required></input>
                </div>
                <div className='login-form-field'>
                    <p>Hostel</p>
                    <input value={formData.hostel} type='text' onChange={handleChange} name='hostel' id='hostel' required></input>
                </div>

            </div>

            <div className='auth-buttons'>
                <button type="submit" onClick={handleSubmit}>Register</button>
                <center><span>Resend Verification</span></center>
                <Divider style={{fontSize: '0.7rem', margin: '30px 0'}}><p >OR</p></Divider>
                <center>Already have an account? <span onClick={() => dispatch(open_login())}> Login here</span></center>
            </div>          
             
        </form>
    )
}