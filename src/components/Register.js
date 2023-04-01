import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle, faColonSign } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Reaptcha from 'reaptcha';
// import ReCAPTCHA from 'react-google-recaptcha';
// const nodemailer = require("nodemailer");

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%_]).{8,24}$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const REGISTER_URL = '/register';
const siteKey = "6LdLcUUlAAAAALomOWyQXrySXyKn8MiZaCNrBt8e";

// import Home component

// clrl + alt+ R , search "rafce", get Register functional component.
const Register = () => {
    // focus on user input when component loads.
    const captchaRef = useRef(null);
    const userRef = useRef();
    // focus on to display an error for accessibility
    const errRef = useRef();


    // state for all the inputs
    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false)

    const [userType, setuserType] = useState('');
    const [secretkey, setSecretkey] = useState('');

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [verified, setVerified] = useState(0);
    const [captchVerify, setcaptchVerify] = useState(false);

    const [visible, setVisible] = useState(false);
    const [nvisible, nsetVisible] = useState(false);

    // const [admin, setAdmin] = useState(1);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [passwordUpdatedTimestamp, setPasswordUpdatedTimestamp] = useState(null);

    const onVerify = recaptchaResponse => {
        setcaptchVerify(true);
    };

    function onchange(value) {
        console.log("captcha value", value);
        setcaptchVerify(true);
    }

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        console.log(result);
        console.log(email);
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, email, pwd, matchPwd, verified])

    const handleSubmit = async (e) => {
        console.log("inside handle" + user, email, pwd);
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        const v3 = EMAIL_REGEX.test(email);
        if (!v1 || !v2 || !v3) {
            setErrMsg("Invalid Entry");
            return;
        }

        if (userType == 'admin' && secretkey !== "biviSec123") {
            e.preventDefault();
            alert("Invalid Admin")
        }
        else {

            fetch("http://localhost:5000/register", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-type": 'application/json',
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    user, email, pwd, userType
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data, "userregister")

                    // setSuccess(true);
                    if (data.status == "ok") {
                        window.localStorage.setItem("token", data.data);
                        alert("Registration Successful");
                        window.location.href = './';
                        setPasswordUpdatedTimestamp(Date.now());
                        localStorage.setItem('passwordUpdatedTimestamp', Date.now());
                        // setSuccess(true);
                    } else if (data.status == 'exist') {
                        alert("Already Existed Username");
                    }
                    else if (data.status == "top") {

                        // setErrMsg('Password not allowed.');
                        alert("it's on top 5 password, which is not allowed")
                        console.log("Password not allowed");
                        return;

                    }

                    else {
                        alert("Something went wrong");
                    }
                })
        }
        // console.log(user, pwd);
        // setSuccess(true);
        // try {
        //     const response = await axios.post(REGISTER_URL,
        //         JSON.stringify({ user, pwd, email }),
        //         {
        //             headers: { 'Content-Type': 'application/json' },
        //             withCredentials: true
        //         }
        //     );
        //     console.log(response?.data);
        //     console.log(response?.accessToken);
        //     console.log(JSON.stringify(response))
        //     setSuccess(true);
        //     //clear state and controlled inputs
        //     //need value attrib on inputs for this
        //     setUser('');
        //     setPwd('');
        //     setMatchPwd('');
        // }
        // catch (err) {
        //     if (!err?.response) {
        //         setErrMsg('No Server Response');
        //     } else if (err.response?.status === 409) {
        //         setErrMsg('Username Taken');
        //     } else {
        //         setErrMsg('Registration Failed')
        //     }
        //     // errRef.current.focus;
        // }
    }



    return (
        <>
            {success ? (
                <section>
                    <h2>Successfully Registered. Please verify your email.</h2>
                    <p>
                        <a href="/signin">Sign In</a>
                    </p>
                </section>
            ) :
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive"> {errMsg}</p>
                    <h1>Register</h1>
                    <div>
                        <input type="radio"
                            id="user"
                            name="userType"
                            ref={userRef}
                            onChange={(e) => setuserType(e.target.value)}
                            value="user"
                            required
                            aria-describedby="radio"
                        />
                        <label htmlFor="user" style={{ marginRight: 30 }}>User</label>

                        <input type="radio"
                            id="admin"
                            name="userType"
                            ref={userRef}
                            onChange={(e) => setuserType(e.target.value)}
                            value="admin"
                            required
                            aria-describedby="radio"
                        />
                        <label htmlFor="admin">Admin</label>

                    </div>
                    <form onSubmit={handleSubmit}>


                        {userType == "admin" ?
                            <div>
                                <label htmlFor="user">Secret Key:</label>
                                <input type="text"
                                    id="type"
                                    name="secretkey"
                                    ref={userRef}
                                    onChange={(e) => setSecretkey(e.target.value)}
                                    value={secretkey}
                                    required
                                    aria-describedby="radio"
                                /></div> : null}


                        <label htmlFor="username">
                            Username:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must begin with a letter.<br />
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>

                        <label htmlFor="email">
                            Email:
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="email"
                            id="email"
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


                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                        </label>
                        <div className="flex justify-between items-center mx-8 position-relative">
                            <input
                                type={visible ? "text" : "password"}
                                id="password" className="bg-gray-200 text-gray-900 text-sm w=[300px] mw-100 position-relative"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                            />
                            <span onClick={() => { setVisible(!visible) }}> {visible ? <EyeOutlined className="eyeicon" /> : <EyeInvisibleOutlined className="eyeicon" />}</span>

                        </div>

                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must include uppercase and lowercase letters including number and a special character only.<br />
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span> <span aria-label="percent">_</span>
                        </p>


                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                        </label>
                        <div className="flex justify-between items-center mx-8 position-relative">
                            <input
                                type={nvisible ? "text" : "password"}
                                id="confirm_pwd"
                                onChange={(e) => setMatchPwd(e.target.value)} className="bg-gray-200 text-gray-900 text-sm w=[300px] mw-100 position-relative"
                                value={matchPwd}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                            />
                            <span onClick={() => { nsetVisible(!nvisible) }}> {nvisible ? <EyeOutlined className="eyeicon" /> : <EyeInvisibleOutlined className="eyeicon" />}</span>
                        </div>
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>
                        <label htmlFor="">
                            <Reaptcha sitekey={siteKey} onVerify={onVerify} />
                        </label>
                        <button disabled={!validName || !validPwd || !validMatch || !captchVerify || !validEmail ? true : false}>Sign Up</button>

                    </form>
                    <p>Already Have an Account ? <br />
                        <span className="line">
                            <a href="/signin">Sign In</a>
                        </span>
                    </p>

                </section>
            }
        </>
    )
}

export default Register;
