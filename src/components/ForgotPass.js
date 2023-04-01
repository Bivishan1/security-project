import React from 'react'
import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle, faColonSign } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%_]).{8,24}$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const REGISTER_URL = '/register';

const ForgotPass = () => {

    const userRef = useRef();
    // focus on to display an error for accessibility
    const errRef = useRef();


    // state for all the inputs

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // useEffect(() => {
    //     userRef.current.focus;
    // }, [])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        console.log(result);
        console.log(email);
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        setErrMsg('');
    }, [email])

    const handleSubmit = (e) => {

        console.log(email);
        e.preventDefault();
        // if button enabled with JS hack
        const v3 = EMAIL_REGEX.test(email);
        if (!v3) {
            setErrMsg("Invalid Entry");
            return;
        }

        fetch("http://localhost:5000/forgotpass", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-type": 'application/json',
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                email,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, "forgotpassword")
                if (data.status == "error") {
                    alert("User email not found")
                }
                else if (data.status == "ok") {
                    alert("Email has been sent. Please Verify before login.")
                }
                // setSuccess(true);
                // if (data.status == "ok") {
                //     window.localStorage.setItem("token", data.data);
                //     alert("Registration Successful");
                //     // setSuccess(true);
                // } else if (data.status == 'exist') {
                //     alert("Already Existed Username");
                // }

                // else {
                //     alert("Something went wrong");
                // }
            });
    }



    return (
        <>
            <section>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive"> {errMsg}</p>
                <h1>Forgot Password?</h1>
                <form onSubmit={handleSubmit}>


                    <label htmlFor="email">
                        Email:
                        <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder='Enter your registered email'
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        aria-invalid={validEmail ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                    />
                    <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must include proper domain name<br />
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must begin with a letter or number.<br />
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must include <i> @</i>
                    </p>




                    <button disabled={!validEmail ? true : false}>Send Email</button>

                </form>
                <p>Remember Something?<br />
                    <span className="">

                        <Link to="/signin">Sign In</Link>
                    </span>
                </p>

            </section>
        </>

    )
}

export default ForgotPass;