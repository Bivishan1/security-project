import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle, faColonSign } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import ReCAPTCHA from 'react-google-recaptcha';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%_]).{8,24}$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;


const REGISTER_URL = '/register';




// import Home component

// clrl + alt+ R , search "rafce", get Register functional component.
const Signin = () => {
    const captchaRef = useRef(null);
    // focus on user input when component loads.
    const userRef = useRef();
    // focus on to display an error for accessibility
    const errRef = useRef();


    // state for all the inputs
    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false)

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const [remainingAttempts, setRemainingAttempts] = useState(3);
    const [timerr, setTimer] = useState(null);

    const [visible, setVisible] = useState(false);

    const [captchVerify, setcaptchVerify] = useState(false);

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
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
    }, [pwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {


        try {
            console.log("inside handle" + user, pwd);
            e.preventDefault();
            // if button enabled with JS hack
            const v1 = USER_REGEX.test(user);
            const v2 = PWD_REGEX.test(pwd);
            // const v3 = EMAIL_REGEX.test(email);
            if (!v1 || !v2) {
                setErrMsg("Invalid Entry");
                return;
            }
            // console.log(user, pwd);
            // setSuccess(true);
            fetch("http://localhost:5000/sign-in", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-type": 'application/json',
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    user, pwd
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data, "user signin")
                    if (data.status == "ok") {
                        alert("Sign-In Successful");
                        window.localStorage.setItem("token", data.data);
                        window.localStorage.setItem("token2", data.data);
                        window.location.href = "./userDash";
                        window.localStorage.setItem('loggedIn', true);

                    }
                    else {
                        alert("user and password doesn't match")
                        setErrorMessage('user and password matching error error');
                        setRemainingAttempts((prev) => prev - 1);
                        document.querySelector('.attempt-error').innerHTML = `<b>Wrong credentials. ${remainingAttempts} attempt left.</b>`;
                    }
                    // setSuccess(true);
                })

        }
        catch (error) {
            console.log(error)
            setErrorMessage(error.response.data.message);
            setRemainingAttempts((prev) => prev - 1);
        }





        // try {
        //     const response = await axios.post(REGISTER_URL,
        //         JSON.stringify({ user, pwd }),
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

        // }
        // catch (err) {
        //     if (!err?.response) {
        //         setErrMsg('No Server Response');
        //     } else if (err.response?.status === 409) {
        //         setErrMsg('Username Taken');
        //     } else {
        //         setErrMsg('SignIn Failed')
        //     }
        //     errRef.current.focus();
        // }
    }

    useEffect(() => {
        if (remainingAttempts < 0) {
            // Disable login button and start timer
            document.getElementById("login-button").disabled = true;
            const interval = setInterval(() => {
                setTimer((prev) => (prev === 0 ? null : prev - 1));
            }, 1000);
            setTimer(60);
            setTimeout(() => {
                // Enable login button and reset remaining attempts
                document.getElementById("login-button").disabled = false;
                setRemainingAttempts(3);
                clearInterval(interval);
            }, 60000);
        }
    }, [remainingAttempts]);



    return (
        <>
            {success ? (
                <section>
                    <h2>Successfully Login.</h2>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ) :
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive"> {errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
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
                        <p id="uidnote" className={userFocus && user ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must begin with a letter.<br />
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Letters, numbers, underscores, hyphens allowed.
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

                        <p>
                            <span className="line1">
                                <Link to="/forgotpass">Forgot Password ?</Link>
                                {/* <a href="/forgotpass">Forgot Password?</a> */}
                            </span>
                        </p>


                        <label htmlFor="">
                            <ReCAPTCHA sitekey="6LdLcUUlAAAAALomOWyQXrySXyKn8MiZaCNrBt8e" ref={captchaRef} onChange={onchange} />
                        </label>

                        <button id="login-button" disabled={!validName || !validPwd || !captchVerify ? true : false}>Sign In</button>

                    </form>


                    {remainingAttempts < 0 ? (
                        <p className="limit-error">

                            You have exceeded the maximum number of login attempts. Please wait{" "}
                            {timerr} seconds before trying again.
                        </p>
                    ) :
                        <p>
                            <span className="attempt-error"></span>
                        </p>
                    }

                    {/* {errorMessage && <p>{errorMessage}</p>} */}


                    <p>Don't Have an Account ? <br />
                        <span className="line">
                            <a href="/register">Sign Up</a>
                        </span>
                    </p>

                </section>
            }


        </>
    )
}

export default Signin;
