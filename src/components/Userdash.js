import React, { Component, useEffect, useState } from "react";

export default function UserDetails() {
    const [userData, setuserData] = useState(null);

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
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <h1> Welcome to Dashboard.</h1><br></br>
            Name : <h1> {userData.data}</h1>
            Email : <h2> bivi@bivi.com</h2>
        </>
    )

}


