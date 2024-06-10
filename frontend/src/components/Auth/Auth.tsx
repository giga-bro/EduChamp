// @ts-nocheck
import React from 'react'
import './index.css'
import SignIn from './SignIn'
import SignUp from './SignUp'

const Auth:React.FC = () => {
    return (
        <>
            <div className="h-screen w-screen flex justify-center items-center ">
                <div className="container">
                    <div className="signin-signup">
                        <SignIn />
                        <SignUp />
                    </div>
                    <div className="panels-container">
                        <div className="panel left-panel">
                            <div className="content">
                                <h3>Already a member of EduChamp?</h3>
                                <p>
                                    Click the button below to sign-in
                                </p>
                                <button className="btn" id="sign-in-btn" onClick={() => document.querySelector(".container")?.classList.remove("sign-up-mode")}>
                                    Sign in
                                </button>
                            </div>
                        </div>
                        <div className="panel right-panel">
                            <div className="content">
                                <h3>New to EduChamp?</h3>
                                <p>
                                    Click the button below to sign-up
                                </p>
                                <button className="btn" id="sign-up-btn" onClick={() => document.querySelector(".container")?.classList.add("sign-up-mode")}>
                                    Sign up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Auth
