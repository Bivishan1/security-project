import React, { Component, useEffect, useState } from "react";
import '../views/email-verified';
import UserDetails from "./userDash";

export default function Verify() {
    const [verified, setVerified] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`http://localhost:5000/user/${token}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const data = await res.json();
                if (data.status == "success") {
                    const { user } = data;
                    const userId = user._id;
                    console.log(userId);
                    const verifyRes = await fetch(`http://localhost:5000/verify?id=${userId}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    const verifyData = await verifyRes.json();
                    if (verifyData.status === "success") {
                        setVerified(1);
                        alert('user verified');
                        console.log("user verified");
                    } else {
                        alert("Something went wrong");
                    }
                } else {
                    alert("User not found");
                }
            } catch (err) {
                console.error(err);
            }
        };
    })
}