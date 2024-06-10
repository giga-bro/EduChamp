// @ts-nocheck
import React, { useState } from 'react'
import axios from 'axios'
import './index.css'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';


const SignIn: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(email === '' || password === '') {
            Swal.fire({
                icon: 'error',
                title: 'Empty Fields',
                text: 'Please fill in all the fields'
            })
            return
        }
        try {
            const res = await axios('https://educhamp.onrender.com/api/auth/login', { method: 'POST', data: { email, password } })
            if (res.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: res.data.message
                })
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('email', res.data.email)
                localStorage.setItem('username', res.data.username)
                localStorage.setItem('name', res.data.name)
                localStorage.setItem('bio', res?.data?.bio || 'No bio yet')
                localStorage.setItem('profilePicPath', res?.data?.profilePicPath || '')
                localStorage.setItem('backgroundPicPath', res?.data?.backgroundPicPath || '')
                navigate('/dashboard')
            } else if (res.status === 400) {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Credentials',
                    text: res.data.message
                })
            } else if (res.status === 500) {
                Swal.fire({
                    icon: 'error',
                    title: 'Server Error',
                    text: 'Please try again later!'
                })
            }
            console.log(res)
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Server Error',
                text: 'Please try again later!'
            })
            console.log(error)
        }
    }
    return (
        <>
            <form onSubmit={handleLogin} className="sign-in-form">
                <h2 className="title">Sign in</h2>
                <div className="input-field">
                    <i className="fas fa-user" />
                    <input type="text" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}  />
                </div>
                <div className="input-field">
                    <i className="fas fa-lock" />
                    <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <input type="submit" defaultValue="Login" value="Login" id='login_btn' className="btn"  />
                <p className="social-text">Or Sign in with social platform</p>
                <div className="social-media">
                    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                        <GoogleButton />
                    </GoogleOAuthProvider>
                </div>
                <div className='w-[100%] h-[20%] underline mt-[5%] flex justify-center items-center text-center text-white lg:w-0 lg:h-0 lg:hidden ' >
                    <p  onClick={() => document.querySelector(".container")?.classList.add("sign-up-mode")} >Don't have an account ? </p>
                </div>
            </form>
        </>
    )
}

export const GoogleButton = () => {
    const navigate = useNavigate();
    const signIn = useGoogleLogin({
        onSuccess: async (response: Omit<TokenResponse, "error" | "error_description" | "error_uri">) => {
            console.log(response)
            navigate('/dashboard')

            const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                    Authorization: `Bearer ${response.access_token}`,
                },
            });
            localStorage.setItem('email', userInfoResponse.data.email)
            localStorage.setItem('name', userInfoResponse.data.name)
            localStorage.setItem('picture', userInfoResponse.data.picture)
        },
        onFailure: (response: Omit<CodeResponse, "error" | "error_description" | "error_uri">) => {
            console.log(response);
        }
    });
    return (
        <a className="social-icon lg:!px-[20%] px-[15%] " id="googleIcon" onClick={() => signIn()}  >
            <p className='font-bold text-xs  lg:text-sm flex text-center lg:text-end justify-end items-center  lg:w-[70%] w-[90%] ' >Login with Google</p><i className="fab fa-google  " />
        </a>
    );
}



export default SignIn
