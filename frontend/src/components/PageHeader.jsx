import React from "react";
import './PageHeader.css'

export default function PageHeader(props) {

    return (
        <div className="header">
            {props.name} <br />
            <p className="navigator">Home &gt; {props.name} </p>

        </div>
    )

}