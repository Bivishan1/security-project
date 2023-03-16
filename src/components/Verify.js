import { useEffect, useState } from "react";
// import '../views/email-verified';
// import UserDetails from "./userDash";
// import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
export default function Verify() {
    //     const [verified, setVerified] = useState(0);
    //     useEffect(() => {
    //         const fetchData = async () => {
    //             try {
    //                 const token = localStorage.getItem("token");
    //                 const res = await fetch(`http://localhost:5000/user/${token}`, {
    //                     method: "POST",
    //                     headers: {
    //                         "Content-Type": "application/json"
    //                     }
    //                 });
    //                 const data = await res.json();
    //                 if (data.status == "success") {
    //                     const { user } = data;
    //                     const userId = user._id;
    //                     console.log(userId);
    //                     const verifyRes = await fetch(`http://localhost:5000/verify?id=${userId}`, {
    //                         method: "POST",
    //                         headers: {
    //                             "Content-Type": "application/json"
    //                         }
    //                     });
    //                     const verifyData = await verifyRes.json();
    //                     if (verifyData.status === "success") {
    //                         setVerified(1);
    //                         alert('user verified');
    //                         console.log("user verified");
    //                     } else {
    //                         alert("Something went wrong");
    //                     }
    //                 } else {
    //                     alert("User not found");
    //                 }
    //             } catch (err) {
    //                 console.error(err);
    //             }
    //         };
    //     })
    //     return (
    //         <>
    //             <h1>Email verified.</h1>
    //         </>
    //     )
    // }




    const { id } = useParams();
    const [verificationStatus, setVerificationStatus] = useState(null);

    const verifyUser = async () => {

        try {
            const response = await fetch(`http://localhost:5000/user/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const { status } = response.data;
            setVerificationStatus(status);
        } catch (error) {
            console.log(error);
        }
    };

    // useEffect(() => {

    //     console.log(id);
    //     verifyUser();
    // }, [id]);

    return (
        <div>
            {id}
            {/* {verificationStatus === 'success' ? (
                <h1>Thank you for verifying your email!</h1>

            ) : (
                <h1>Oops, something went wrong. Please try again later.</h1>
            )} */}
        </div>
    );
}