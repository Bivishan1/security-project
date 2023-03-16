import React, { Component, useEffect, useState } from "react";
import Session from '../session/Session';

export default function UserDetails() {
    const timer = Session(10);
    const [userData, setuserData] = useState(null);
    const [sessionTimeout, setSessionTimeout] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("http://localhost:5000/userDash", {
                    method: "POST",
                    crossDomain: true,
                    headers: {
                        "Content-type": 'application/json',
                        Accept: "application/json",
                        "Access-Control-Allow-Origin": "*"
                    },
                    body: JSON.stringify({
                        token: window.localStorage.getItem("token")
                    }),
                });
                const data = await res.json();
                console.log(data, "userData");
                setuserData(data.data);
                console.log(data.data.user);

                // if (data.data == "token expired") {
                //     alert("Session expired. LogIn Again");
                //     window.localStorage.clear();
                //     window.location.href = './signin';
                // }
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);



    function logout() {
        window.localStorage.clear();
        window.location.href = './signin';
    }

    if (timer == 0) {
        alert('Session expired. you will log out')
        window.localStorage.clear();
        window.location.href = './signin';
        // return <div>Logged Out</div>;
    }

    return (
        <>
            Name : <h1> {userData && userData.user} </h1>
            Email : <h2> {userData && userData.email}</h2>

            <div className="wrapper">
                <button className="btn btn-primary px-3" onClick={logout}>Sign Out</button>

                <button className="btn btn-primary" >Change Password</button>
            </div>

        </>
    )

}


