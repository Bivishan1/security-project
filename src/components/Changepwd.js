import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle, faColonSign } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ReCAPTCHA from 'react-google-recaptcha';
// const nodemailer = require("nodemailer");


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%_]).{8,24}$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const REGISTER_URL = '/register';

// import Home component
const topPasswords = ['password', '123456', 'Admin123@', 'admin', 'Letme_in'];
// clrl + alt+ R , search "rafce", get Register functional component.
const Changepwd = (userId) => {
    const captchaRef = useRef(null);
    // focus on user input when component loads.
    const userRef = useRef();
    // focus on to display an error for accessibility
    const errRef = useRef();


    // state for all the inputs

    const [email, setEmail] = useState('');

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false)



    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [newmatchPwd, newsetMatchPwd] = useState('');
    const [newvalidMatch, newsetValidMatch] = useState(false);
    const [newmatchFocus, newsetMatchFocus] = useState(false);

    const [verified, setVerified] = useState(0);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const [visible, setVisible] = useState(false);
    const [nvisible, nsetVisible] = useState(false);
    const [n1visible, n1setVisible] = useState(false);

    const [captchaVerify, setcaptchVerify] = useState(false);

    const [formValues, setFormValues] = useState({ matchPwd: '' });

    const [passwordUpdatedTimestamp, setPasswordUpdatedTimestamp] = useState(null);

    // useEffect(() => {
    //     userRef.current.focus;
    // }, [])

    function onchange(value) {
        console.log("captcha value", value);
        setcaptchVerify(true);
    }





    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        // const match = pwd === matchPwd;
        // setValidMatch(match);
    }, [pwd])



    useEffect(() => {
        const result = PWD_REGEX.test(matchPwd);
        console.log(result);
        console.log(matchPwd);
        setValidMatch(result);
        const match = matchPwd === newmatchPwd;
        newsetValidMatch(match);
    }, [matchPwd, newmatchPwd])



    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd, newmatchPwd])

    // const token = window.localStorage.getItem('token');
    // change password
    // close

    // const token = window.localStorage.getItem('token');
    // fetch('http://localhost:5000/get-token', {
    //     method: 'POST',
    //     body: JSON.stringify({ token }),
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // }).then(response => response.json())
    //     .then(data => {
    //         console.log(data);
    //         // Do whatever you need to do with the response data here
    //     })
    //     .catch(error => {
    //         console.error(error);
    //     });




    const handleSubmit = async (e) => {
        // console.log("inside handle" + user, email, pwd);
        e.preventDefault();

        const v2 = PWD_REGEX.test(pwd);
        if (!v2) {
            setErrMsg("Invalid Entry");
            return;
        }



        // const token = window.localStorage.getItem("token");
        // fetch("http://localhost:5000/update-password", {
        //     method: "POST",
        //     headers: {
        //         "Content-type": "application/json",
        //         Accept: "application/json",
        //         Authorization: `${token}`

        //     },
        //     body: JSON.stringify({
        //         pwd,
        //         _csrf: csrfToken // assuming csrfToken is already defined
        //     }),
        // })
        //     .then((res) => res.json())
        //     .then((data) => {
        //         console.log(data);
        //         setMessage(data.message);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //         setMessage(error.message);
        //     });

        // let's try another method

        // async function handleChangePassword() {
        //     const { matchPwd } = formValues;
        //     const response = await fetch('/change-password', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({ newPassword }),
        //     });
        //     const data = await response.json();
        //     if (data.error) {
        //         setErrMsg(data.error);
        //     } else {
        //         setSuccess('Password changed successfully.');
        //     }
        // }


        try {
            const token = window.localStorage.getItem("token");
            // const { matchPwd } = formValues;
            fetch("http://localhost:5000/changepwd", {

                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-type": 'application/json',
                    Accept: "application/json",
                    Authorization: `${token}`,

                },
                body: JSON.stringify({
                    pwd, matchPwd
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status == "ok") {
                        alert("Paassword updated");
                        window.localStorage.clear();
                        window.location.href = './';
                        // console.log(data, "user password changed")
                    }
                    else if (data.status == "failpassword") {
                        alert("current password doesn't match");
                    }
                    else if (data.status == "top") {

                        // setErrMsg('Password not allowed.');
                        alert("it's on top 5 password, which is not allowed")
                        console.log("Password not allowed");
                        return;

                    }

                    else if (data.status == "same") {

                        // setErrMsg('Password not allowed.');
                        alert("Old and new password are same.")
                        // console.log("Password not allowed");
                        return;

                    }
                    else if (data.status == "lastfive") {
                        alert("last five password not allowerd");
                        return;
                    }
                    else {
                        alert("failed to update")
                    }


                    // setSuccess(true);
                })
        }
        catch (error) {
            console.log(error)
            // setErrorMessage(error.response.data.message);
            // setRemainingAttempts((prev) => prev - 1);
        }


        //     const response = await fetch(`http://localhost:5000/changepwd/`, {
        //         method: "PUT",
        //         headers: {
        //             "Content-type": "application/json",
        //             Accept: "application/json",
        //             Authorization: `${token}`
        //         },
        //         body: JSON.stringify({
        //             pwd,
        //             // newPassword: newPassword,
        //             // _csrf: csrfToken // assuming csrfToken is already defined
        //         }),
        //     });
        //     const data = await response.json();
        //     setSuccess(data.message);
        //     alert("Password changed successfully")
        //     // setError('');
        // } catch (error) {
        //     // setError(error.message);
        //     console.log('error');
        //     setSuccess('');
        // }









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
                    <h1>Change Password</h1>

                    <form onSubmit={handleSubmit}>
                        {/* <input type="hidden" name="_csrf" value={csrfToken} /> */}
                        <label htmlFor="password">
                            old Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                        </label>
                        <div className="flex justify-between items-center mx-8 position-relative">
                            <input
                                type={visible ? "text" : "password"}
                                id="password"
                                onChange={(e) => setPwd(e.target.value)} className="bg-gray-200 text-gray-900 text-sm w=[300px] mw-100 position-relative"
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
                            New Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch ? "valid" : "hide"} />
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
                                aria-describedby="pwdnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                            />
                            <span onClick={() => { nsetVisible(!nvisible) }}> {nvisible ? <EyeOutlined className="eyeicon" /> : <EyeInvisibleOutlined className="eyeicon" />}</span>
                        </div>
                        <p id="pwdnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must include uppercase and lowercase letters including number and a special character only.<br />
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span> <span aria-label="percent">_</span>
                        </p>

                        <label htmlFor="confirm_new_pwd">
                            Confirm New Password:
                            <FontAwesomeIcon icon={faCheck} className={newvalidMatch && newmatchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={newvalidMatch || !newmatchPwd ? "hide" : "invalid"} />
                        </label>
                        <div className="flex justify-between items-center mx-8 position-relative">
                            <input
                                type={n1visible ? "text" : "password"}
                                id="confirm_new_pwd"
                                onChange={(e) => newsetMatchPwd(e.target.value)} className="bg-gray-200 text-gray-900 text-sm w=[300px] mw-100 position-relative"
                                value={newmatchPwd}
                                required
                                aria-invalid={newvalidMatch ? "false" : "true"}
                                aria-describedby="newconfirmnote"
                                onFocus={() => newsetMatchFocus(true)}
                                onBlur={() => newsetMatchFocus(false)}
                            />
                            <span onClick={() => { n1setVisible(!n1visible) }}> {n1visible ? <EyeOutlined className="eyeicon" /> : <EyeInvisibleOutlined className="eyeicon" />}</span>
                        </div>
                        <p id="newconfirmnote" className={newmatchFocus && !newvalidMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>


                        <label htmlFor="">
                            <ReCAPTCHA sitekey="6LdLcUUlAAAAALomOWyQXrySXyKn8MiZaCNrBt8e" ref={captchaRef} onChange={onchange} />
                        </label>
                        <button disabled={!validPwd || !validMatch || !captchaVerify || !newvalidMatch ? true : false}>Change Password</button>

                    </form>

                </section>
            }
        </>
    )
}

export default Changepwd;
