import React, { Component, useEffect, useState } from "react";
import Session from '../session/Session';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function AdminHome({ userData }) {
    const [data, setData] = useState([]);
    useEffect(() => {
        getAllUser();
    }, [])

    function logout() {
        window.localStorage.clear();
        window.location.href = './signin';
    }

    const deleteUser = (id, user) => {
        // alert("delete");
        if (window.confirm(`Are you want to delete ${user}`)) {
            fetch("http://localhost:5000/deleteUser", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    userid: id,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    alert(data.data);
                    getAllUser();
                });
        }
        else {

        }
    }



    //fetching all user
    const getAllUser = () => {
        fetch("http://localhost:5000/getAllUser", {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data, "userData");
                setData(data.data);
            });
    };

    return (
        <>
            <div className="auth-wrapper" style={{ height: "auto" }}>
                <div className="auth-inner" style={{ width: "auto" }}>
                    <h3>Welcome Admin</h3>
                    <table className="table" style={{ width: 500 }}>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>User Type</th>
                            <th>Actions</th>
                        </tr>

                        {data.map((i) => {
                            return (
                                <tr>
                                    <td>{i.user}</td>
                                    <td>{i.email}</td>
                                    <td>{i.userType}</td>
                                    <td>
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            onClick={() => deleteUser(i._id, i.user)}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </table>

                </div>
            </div>
            <div className="wrapper">
                <button className="btn btn-primary px-3" onClick={logout}>Sign Out</button>

                <button className="btn btn-primary" >Change Password</button>
            </div>
        </>
    )
}