// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import './index.css'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
import withReactContent from 'sweetalert2-react-content';
import { LoginSocialFacebook } from 'reactjs-social-login'
import { FacebookLoginButton } from 'react-social-login-buttons'


const SignUp: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [enteredVerificationCode, setEnteredVerificationCode] = useState<string>('')
    const [dispCodeDiv, setDispCodeDiv] = useState<boolean>(false)
    const [loading, setLoading] = useState(false)
    const [hashedVerificationCode, setHashedVerificationCode] = useState<string>('')
    const navigate = useNavigate();

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!dispCodeDiv) {
            if (email === '' || password === '' || name === '' || username === '') {
                Swal.fire({
                    icon: "error",
                    title: "Missing Credentials",
                    text: "Please fill the details!"
                });
                return
            }
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(email)) {
                Swal.fire({
                    icon: "error",
                    title: "Not a valid email",
                    text: "Please enter a valid email!"
                });
                return
            }
            const passwordRegex = /^(?=.*[A-Za-z0-9])(?=.*[^A-Za-z0-9]).{8,}$/;
            if (!passwordRegex.test(password)) {
                Swal.fire({
                    icon: "error",
                    title: "Not a valid password",
                    text: "Password should be atleast 8 characters long and should contain special characters,letters and numbers!"
                });
                return
            }
            try {
                setLoading(true)
                const res = await axios('https://educhamp.onrender.com/api/auth/register', { method: 'POST', data: { email, password, username, name } })
                if (res.status === 201) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 100000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    console.log(res.data)
                    Toast.fire({
                        icon: "success",
                        title: "Verification Code Sent Successfully!"
                    });
                    setHashedVerificationCode(res.data.verificationCode)
                    setDispCodeDiv(true)
                    setLoading(false)
                } else if (res.status === 400) {
                    Swal.fire({
                        icon: "error",
                        title: res.data.message || "User already exists!",
                        text: "Please login!"
                    });
                    setLoading(false)
                } else if (res.status === 500) {
                    Swal.fire({
                        icon: "error",
                        title: "Server Error",
                        text: "Please try again later!"
                    });
                    setLoading(false)
                }
            } catch (error) {
                console.log(error)
                Swal.fire({
                    icon: "error",
                    title: "Server Error",
                    text: "Please try again later!"
                });
                setLoading(false)
            }
        } else {
            try {
                setLoading(true)
                const res = await axios('https://educhamp.onrender.com/api/auth/register', { method: 'POST', data: { email, password, enteredVerificationCode, hashedVerificationCode, username, name } })
                if (res.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "Valid Code",
                        text: "User registered successfully!"
                    });
                    console.log(res.data)
                    localStorage.setItem('token', res.data.token)
                    localStorage.setItem('email', email)
                    localStorage.setItem('name', name)
                    localStorage.setItem('username', username)
                    setLoading(false)
                    navigate('/dashboard');
                } else if (res.status === 400) {
                    Swal.fire({
                        icon: "error",
                        title: "Invalid verification code",
                        text: "Please enter a valid verification code!"
                    });
                    setLoading(false)
                } else if (res.status === 500) {
                    Swal.fire({
                        icon: "error",
                        title: "Server Error",
                        text: "Please try again later!"
                    });
                    setLoading(false)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handlePaste = (ev: ClipboardEvent) => {
        if ((ev.target as HTMLInputElement)?.localName !== 'input') return;
        ev.preventDefault();
        let paste = (ev.clipboardData || window.clipboardData).getData('text');
        paste = paste.toUpperCase();
        let inputs = inputRefs.map((ref) => ref.current);
        if (paste.length !== inputs.length) return; // handle as you want
        setEnteredVerificationCode(paste);
        inputs.forEach((input, index) => {
            input?.focus();
            input.value = paste[index];
        });
    };

    useEffect(() => {
        document.addEventListener('paste', handlePaste);
        return () => {
            document.removeEventListener('paste', handlePaste);
        };
    }, []);

    const inputRefs = Array.from({ length: 4 }, (_, i) => useRef(null));


    return (
        <>
            <form onSubmit={handleSignUp} className="sign-up-form">
                <div className={`flex flex-col items-center w-[100%] sign-up-details `} >
                    <h2 className="title">Sign up</h2>
                    <div className="input-field">
                        <i className="fa-solid fa-user" />
                        <input type="text" placeholder="Enter your full-name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="input-field">
                        <i className="fa-solid fa-circle-user" />
                        <input type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-envelope" />
                        <input type="text" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-lock" />
                        <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
                {dispCodeDiv &&
                    <div className='verification_code_container' >
                        <div id="codeForm" >
                            {[0, 1, 2, 3].map((index) => (
                                <input
                                    key={index}
                                    ref={inputRefs[index]}
                                    type='number'
                                    className='code__input'
                                    autoFocus={index === 0}
                                    maxLength={1}
                                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        const target = e.target as HTMLInputElement;
                                        target.value = e.target.value.toUpperCase();

                                        setEnteredVerificationCode(inputRefs.map(ref => ref.current?.value).join(''));

                                        if (target.value === '') {
                                            inputRefs[index - 1]?.current?.focus();
                                        } else {
                                            inputRefs[index + 1]?.current?.focus();
                                        }
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                }

                <input type="submit" value={dispCodeDiv && loading ? "Sending Code..." : dispCodeDiv ? "Submit Code" : loading ? "Verifying..." : "Get Code"} id='register_btn' className="btn" />
                <p className="social-text">Or Sign in with social platform</p>
                <div className="social-media">
                    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                        <GoogleButton />
                    </GoogleOAuthProvider>
                </div>
                <p className="account-text text-center text-white underline " onClick={() => document.querySelector(".container")?.classList.remove("sign-up-mode")} >
                    Already have an account?{" "}
                </p>
            </form>
        </>
    )
}

export const GoogleButton = () => {
    const navigate = useNavigate();
    const signIn = useGoogleLogin({
        onSuccess: async (response: Omit<TokenResponse, "error" | "error_description" | "error_uri">) => {

            const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                    Authorization: `Bearer ${response.access_token}`,
                },
            });



            localStorage.setItem('email', userInfoResponse.data.email)
            localStorage.setItem('name', userInfoResponse.data.name)
            localStorage.setItem('picture', userInfoResponse.data.picture)
            const MySwal = withReactContent(Swal);


            MySwal.fire({
                title: 'Edit username',
                input: 'text',
                inputLabel: 'Username',
                inputPlaceholder: 'Enter your username',
                showCancelButton: true,
                allowOutsideClick: false,
                inputValidator: async (value) => {
                    if (!value) {
                        return 'You need to write something!';
                    } else {
                        localStorage.setItem('username', value);

                        try {
                            const res = await axios.post('https://educhamp.onrender.com/api/editDetails/enterDetails',
                                {
                                    email: localStorage.getItem('email'),
                                    name: localStorage.getItem('name'),
                                    username: value,
                                    provider: 'google',
                                    bio: '',
                                    profilePic: localStorage.getItem('picture'),
                                    backgroundPic: ''
                                },
                                { headers: { 'Content-Type': 'application/json' } }
                            );

                            if (res.status === 201) {
                                Swal.fire('Saved!', '', 'success');
                                localStorage.setItem('token', res.data.token);
                            } else if (res.status === 400) {
                                return 'Username already in use';
                            } else if (res.status === 500) {
                                return 'Server Error';
                            }
                        } catch (e) {
                            return 'Username is already in use';
                        }
                    }
                }
            }).then((result) => {
                if (result.isDismissed) {
                    Swal.fire('saved', '', 'success')
                    navigate('/dashboard')
                }
            });

        },
        onFailure: (response: Omit<CodeResponse, "error" | "error_description" | "error_uri">) => {
            console.log(response);
        }
    });
    return (
        <a className="social-icon lg:!px-[20%] px-[15%] " id="googleIcon" onClick={() => signIn()}  >
            <p className='font-bold text-xs  lg:text-sm flex text-center lg:text-center justify-end items-center lg:w-[100%] lg:mr-[5%] lg:mb-[2%] w-[90%]  mr-[15%] ' >Login with Google</p><i className="fab fa-google  " />
        </a>
    );
}


export const FacebookLogin = () => {
    const handleSuccess = (response) => {
        console.log(response);
    };

    const handleFailure = (error) => {
        console.error(error);
    };

    return (
        <LoginSocialFacebook
            appId="1466784140594534"
            appSecret="1d78f6c971d2624c444ea09078aea516"
            onResolve={handleSuccess}
            onReject={handleFailure}
        >
            <a className="social-icon" id="facebookIcon">
                <i className="fab fa-facebook-f" />
            </a>
        </LoginSocialFacebook>
    );
};



export default SignUp
