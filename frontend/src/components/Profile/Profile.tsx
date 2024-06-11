// @ts-nocheck

import React, { useState, useEffect } from 'react'
import './profile.css'
import Navbar from '../Navbar/Navbar'
import Swal from 'sweetalert2'
import axios from 'axios'
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { aiImageDB } from '../../config/firebase.config'
import { useNavigate } from 'react-router-dom'


const Profile: React.FC = () => {

    const [bio, setBio] = useState(localStorage.getItem('bio') || 'No bio yet')
    const EditBio = () => {
        Swal.fire({
            title: 'Edit Bio',
            input: 'text',
            inputLabel: 'Bio',
            inputPlaceholder: 'Enter your bio',
            showCancelButton: true,
            inputValidator: async (value) => {
                if (!value) {
                    return 'You need to write something!'
                }
                else {
                    localStorage.setItem('bio', value)

                    try {
                        const res = await axios.post('https://edu-champ-backend.vercel.app/api/editDetails/editBio', { username: localStorage.getItem('username'), bio: value }, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
                        if (res.status === 200) {
                            Swal.fire('Saved!', '', 'success')
                            setBio(value)
                        } else if (res.status === 404) {
                            Swal.fire('User not found', '', 'error')
                        } else if (res.status === 500) {
                            Swal.fire('Server Error', '', 'error')
                        }
                    } catch (e) {
                        console.log(e)
                    }

                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(result.value)
                Swal.fire('Saved!', '', 'success')
            }
        })
    }

    const getFileURL = async (file: File) => {
        try {
            const uniqueFileName = `${Date.now()}_${file.name}`;
            const storageRef = ref(aiImageDB, `files/${uniqueFileName}`);

            const metadata = {
                contentType: file.type,
            };

            const snapshot = await uploadBytesResumable(storageRef, file, metadata);
            const downloadURL = await getDownloadURL(snapshot.ref);

            return downloadURL;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const [profilePic, setProfilePic] = useState(localStorage.getItem('profilePicPath') || '')
    const [backgroundPic, setBackgroundPic] = useState(localStorage.getItem('backgroundPicPath') || '')

    const uploadFile = async (file: File) => {
        try {
            const fileURL = await getFileURL(file)

            const res = await axios.post('https://edu-champ-backend.vercel.app/api/editDetails/editProfilePic', { username: localStorage.getItem('username'), profilePicPath: fileURL }, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
            if (res.status === 200) {
                Swal.fire('Saved!', '', 'success')
                setProfilePic(fileURL)
                localStorage.setItem('profilePicPath', fileURL)
            } else if (res.status === 404) {
                Swal.fire('User not found', '', 'error')
            } else if (res.status === 500) {
                Swal.fire('Server Error', '', 'error')
            }
        } catch (e) {
            console.log(e)
        }
    }

    const navigate = useNavigate()

    const groupUploadFile = async (file: File) => {
        try {
            const fileURL = await getFileURL(file)

            const res = await axios.post('https://edu-champ-backend.vercel.app/api/editDetails/editBackgroundPic', { username: localStorage.getItem('username'), backgroundPicPath: fileURL }, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
            if (res.status === 200) {
                Swal.fire('Saved!', '', 'success')
                setBackgroundPic(fileURL)
                localStorage.setItem('backgroundPicPath', fileURL)
            } else if (res.status === 404) {
                Swal.fire('User not found', '', 'error')
            } else if (res.status === 500) {
                Swal.fire('Server Error', '', 'error')
            }
        } catch (e) {
            console.log(e)
        }
    }

    const fileInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            uploadFile(file);
        }
    };

    const groupFileInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            groupUploadFile(file);
        }
    };

    const [testData, setTestData] = useState<object[]>(localStorage.getItem('results') && localStorage.getItem('results')!== 'undefined' ? JSON.parse(localStorage.getItem('results') as string) : []);
    const [averageScore, setAverageScore] = useState(0);
    const [algebraCorrect, setAlgebraCorrect] = useState(0);
    const [geometryCorrect, setGeometryCorrect] = useState(0);

    useEffect(() => {
        console.log(1)
        const averageScore = testData.reduce((sum, test) => sum + test.score, 0) / testData.length;

        let algebraCorrect = 0;
        let algebraWrong = 0;
        let algebraTotal = 0;
        let geometryCorrect = 0;
        let geometryTotal = 0;

        testData.forEach(test => {
            test.QnA.forEach(question => {
                if (question.tag === 'algebra') {
                    algebraTotal++;
                    if (question.is_correct) {
                        algebraCorrect++;
                    } else {
                        algebraWrong++;
                    }
                }
                if (question.tag === 'geometry') {
                    geometryTotal++;
                    if (question.is_correct) {
                        geometryCorrect++;
                    }
                }
            });
        });
        console.log(2)

        const algebraRatio = algebraCorrect / algebraWrong;

        const algebraPercentage = (algebraCorrect / algebraTotal) * 100;
        const geometryPercentage = (geometryCorrect / geometryTotal) * 100;

        console.log(averageScore, algebraPercentage, geometryPercentage)

        

        setAverageScore(averageScore);
        setAlgebraCorrect(algebraPercentage);
        setGeometryCorrect(geometryPercentage);


        let options = {
            startAngle: -1.55,
            size: 150,
            value: 0.85,
            fill: { gradient: ['#a445b2', '#fa4299'] }
        }
        $(".circle .bar").circleProgress(options).on('circle-animation-progress',
            function (event, progress, stepValue) {
                $(this).parent().find("span").text(String(stepValue.toFixed(2).substr(2)) + "%");
            });
        $(".js .bar").circleProgress({
            value: algebraPercentage/100 > 0 ? algebraPercentage/100 : 0.0
        });
        $(".node .bar").circleProgress({
            value: geometryPercentage/100 > 0 ? geometryPercentage/100 : 0.0
        });
        $(".react .bar").circleProgress({
            value: averageScore/100 > 0 ? averageScore/100 : 0.0
        });
    }, [])


    return (
        <>
            <div className='h-screen w-screen  flex flex-col items-end font-montserrat '>
                <div className='w-[100%] lg:w-[40%] h-[10%]  flex justify-center items-center ' >
                    <Navbar index={3} />
                </div>
                <div className="profile-container  ">
                    <div className="profile-header" style={{ backgroundImage: `url(${backgroundPic})` }} >
                        <div className="profile-img">
                            <input type="file" className='w-[25%] h-[90%] border border-black absolute top-[40%] z-10 left-[5%] opacity-0 cursor-pointer  ' onChange={fileInputHandler} />
                            <img src={profilePic.length > 0 ? profilePic : '/images/personIcon.png'} width="200" alt="Profile" />
                        </div>
                        <div className="profile-nav-info !text-white ">
                            <h3 className="user-name">{localStorage.getItem('username')}</h3>
                            <div className="address">
                                <p id="state" className="state">{localStorage.getItem('name')}</p>
                            </div>
                        </div>
                        <div className="profile-option">
                            <div className="notification">
                                <input type="file" className='w-[250%] h-[150%] border border-black absolute top-[0%] z-10 right-[1%]  opacity-0 cursor-pointer  ' onChange={groupFileInputHandler} />
                                <i className="fa-solid fa-pen"></i>
                            </div>
                        </div>
                    </div>

                    <div className="main-bd">
                        <div className="left-side">
                            <div className="profile-side">
                                <p className="user-mail"><i className="fa fa-envelope"></i> {localStorage.getItem('email')}</p>
                                <div className="user-bio">
                                    <h3><i className="fa fa-info"></i>Bio</h3>
                                    <p className="bio">
                                        {bio}<i className="fa-solid fa-pen" onClick={EditBio} ></i>

                                    </p>
                                </div>
                                <div className="profile-btn">
                                    <button className="createbtn" id="Create-post" onClick={()=> navigate('/') } ><i className="fa fa-plus"></i> Create Another Acount</button>
                                </div>
                                <div className="user-rating">
                                    <div className="rate">
                                        <span className="no-of-user-rate text-[#c266d3] lg:!text-lg "><span> Total Tests Attempted :- {testData.length}</span>&nbsp;&nbsp;Tests</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="right-side">
                            <div className="profile-body  flex flex-col justify-start items-center  ">
                                <div className='w-[100%] h-[40%] flex justify-between lg:justify-center items-center ' >
                                    <div className="wrapper !w-[48%] lg:!w-[30%] mx-[2%] ">

                                        <div className="card js ">
                                            <div className="circle">
                                                <div className="bar"></div>
                                                <div className="box"><span></span></div>
                                            </div>
                                            <div className="text">Algebra</div>
                                        </div>
                                    </div>
                                    <div className="wrapper !w-[48%] lg:!w-[30%]  mx-[2%]">

                                        <div className="card react ">
                                            <div className="circle">
                                                <div className="bar"></div>
                                                <div className="box"><span></span></div>
                                            </div>
                                            <div className="text">Geometry</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-[100%] h-[60%]  flex justify-center items-center ' >
                                    <div className="wrapper !w-[80%] lg:!w-[50%]  mx-[2%]">

                                        <div className="card node ">
                                            <div className="circle">
                                                <div className="bar"></div>
                                                <div className="box"><span></span></div>
                                            </div>
                                            <div className="text">Average Score</div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                {/* </div> */}
            </div>

        </>
    )
}

export default Profile
