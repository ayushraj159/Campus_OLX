import React from 'react';
import reactDom from 'react-dom';
import {ThreeDots} from 'react-loader-spinner';

export default function Loading() {
    return (<div
        style={{
            marginTop:"100px",
            width: "100%",
            height: "100",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}
    >
        <ThreeDots color="var(--primary)" height="100" width="100" />
    </div>)
}