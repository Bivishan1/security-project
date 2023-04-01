import React, { Component, useEffect, useState } from "react";
import Session from '../session/Session';
import Alert from 'react-bootstrap/Alert';
import MyAlert from "./MyAlert";


export default function UserHome({ userData }) {

    const [passwordFrequency, setPasswordFrequency] = useState(90);
    const [expirationDays, setExpirationDays] = useState(null);
    // bootstrap alert close
    const [show, setShow] = useState(true);

    const token = window.localStorage.getItem("token");

    useEffect(() => {


        fetch("http://localhost:5000/user/password_expiration_days", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setExpirationDays(data.days);
            });


    }, []);

    const handleFrequencyChange = (e) => {
        const days = e.target.value;
        setPasswordFrequency(days);
        fetch("http://localhost:5000/user/set_password_frequency", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ days }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, "handlefrequency");
                alert(data.status);
            });
    };



    function logout() {
        window.localStorage.clear();
        window.location.href = './signin';
    }

    function changepass() {
        window.location.href = './changepwd'
    }

    return (
        <>

            {/* <p>Change Password Frequency:</p> */}


            <MyAlert className="expire-alert" alert={expirationDays} />
            {/* <p className="expire-alert">Your password will expire in {expirationDays} days.</p> */}


            <h2 className="font-weight-bold">Name :</h2> <h3 className="text-white"> {userData && userData.user} </h3>
            <h2>Email :</h2> <h3 className="text-white"> {userData && userData.email}</h3>

            <div className="wrapper">
                <button className="btn btn-primary px-3" onClick={logout}>Sign Out</button>

                <button className="btn btn-primary" onClick={changepass} >Change Password</button>
            </div>
        </>
    )
}