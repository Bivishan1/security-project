import React, { Component, useEffect, useState } from "react";
import Session from '../session/Session';
import AdminHome from "./AdminHome";
import UserHome from "./UserHome";


export default function UserDetails() {
    const timer = Session(10);
    const [userData, setuserData] = useState(null);
    const [sessionTimeout, setSessionTimeout] = useState(false);
    const [admin, setAdmin] = useState(false);

    // const [csrfToken, setCSRFToken] = useState('');
    const [remainingDays, setRemainingDays] = useState(null);



    // useEffect(() => {
    //     setCSRFToken(getCSRFToken());
    // }, []);






    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("http://localhost:5000/userDash", {
                    method: "POST",
                    crossDomain: true,
                    headers: {
                        "Content-type": 'application/json',
                        Accept: "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                    body: JSON.stringify({
                        token: window.localStorage.getItem("token"),
                        // token2: window.localStorage.getItem("token2")

                    }),
                });
                const data = await res.json();
                console.log(data, "userData");
                if (data.data.userType == "admin") {
                    setAdmin(true)
                }


                setuserData(data.data);
                // setuserData(data.data1);
                console.log(data.data.userType);
                console.log(admin);

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

    //  here to set session expire
    // if (timer == 0) {
    //     alert('Session expired. you will log out')
    //     window.localStorage.removeItem('token')
    //     window.localStorage.clear();
    //     window.location.href = './signin';
    //     // return <div>Logged Out</div>;
    // }

    return (
        <>

            {admin ? <AdminHome user={userData} /> : <UserHome userData={userData} />}
        </>
    )

}


