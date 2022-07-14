import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { useDispatch, useSelector } from 'react-redux';
import Loading from "../components/Loader";
import { axios } from "../api";
import AdCard from "../components/AdCard";
import timeSince from "../time";
import { Link } from "react-router-dom";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function MyAds(){

    const email = useSelector((state: RootState) => state.auth.email)
    const [loading, setLoading] = useState(false)
    const [ads, setAds] = useState([]);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };    

    useEffect(
        () => {
        setLoading(true)
        console.log("email here", email)
        axios.get('products/',{params: {
            email: email,
        }} ).then((response) => {
            setAds(response.data.data);
            console.log(ads);
            setLoading(false)
        }).catch((error) => {
            if (error.response) {
                console.log(error.response);
            }
        });
    }, [])

    return (
        <>
            <PageHeader name = "My Ads" />
            {
            loading ?
            <Loading />
            :
                <div className="home-ads">
                    {ads.map((item, index) => {
                        var d = timeSince(new Date(item.posted_on));
                        console.log(d)
                        
                        return (

                                <AdCard image={(item.product_images.length > 0 ? item.product_images[0].image :
                                    "")} category={item.category} title={item.title} price={item.price} posted_on={d} negotiable = {item.negotiable} editable={true} id = {item.id}/>
                            
                        )
                    })}
                    {/* {console.log(ads)} */}

                </div>
        }
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
        </>
    )
}