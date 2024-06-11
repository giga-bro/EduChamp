// @ts-nocheck
import React from 'react'
import './index.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'


const About: React.FC = () => {
    return (
        <>
            <div className='h-screen w-screen  flex flex-col items-end font-montserrat '>
                <div className='w-[100%] lg:w-[40%] h-[10%]  flex justify-center items-center ' >
                    <Navbar index={2} />
                </div>
                <div className="  w-full lg:h-[90%] h-[90%] flex flex-col justify-start lg:items-start items-center overflow-y-scroll overflow-scroll px-[5%] ">
                    <div className='w-[100%] h-[10%]   flex justify-center items-center text-center font-bold text-xl lg:text-4xl' >
                        <p>Welcome to EduChamp!</p>
                    </div>
                    <div className='w-[100%] h-[90%]   flex flex-col lg:flex-row justify-center items-center text-center font-bold text-xl ' >
                        <div className='w-[100%] h-[50%] lg:h-[100%]    flex justify-center items-center ' >
                            <img src="/images/aboutuspageimage.png" alt="" className='w-[100%] h-[100%] lg:h-[80%] lg:w-[fit-content] ' />
                        </div>
                        <div className='w-[100%] h-[50%] lg:h-[100%]   flex flex-col justify-center lg:justify-start lg:items-end lg:pt-[2%] items-center text-center lg:text-end font-thin text-sm lg:text-2xl text-[#c266d3] ' >
                            <p>At EduChamp, we believe that every student has the potential to excel, given the right tools and support. Our mission is to provide a state-of-the-art online practice platform that empowers students from grades 7th to 10th to enhance their mathematical skills through personalized, adaptive testing.</p>
                            <p className='hidden lg:flex lg:my-[2%] ' >In today's fast-paced educational landscape, students often face a one-size-fits-all approach that doesn't cater to their individual needs. At EduChamp, we recognize that each student is unique, with their own strengths, weaknesses, and learning styles. That's why we've developed a platform that adapts to each student's level, ensuring they receive the right challenges and support to foster continuous improvement.</p>
                            <p className='hidden lg:flex  lg:my-[2%]'>Our innovative use of Computerized Adaptive Testing (CAT) technology sets us apart. By dynamically adjusting the difficulty of questions based on real-time performance, we create a customized learning path for every student</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-[100vw] h-[100vh]    font-montserrat px-[5%]' >
                <div className='w-[100%] h-[10%]   flex justify-center items-center text-center font-bold text-xl lg:text-4xl ' >
                    <p>Our Mission!</p>
                </div>
                <div className='w-[100%] h-[90%]   flex flex-col lg:flex-row-reverse justify-center items-center text-center font-bold text-xl ' >
                    <div className='w-[100%] h-[50%] lg:h-[100%]    flex justify-center items-center ' >
                        <img src="/images/missionsectionimg.png" alt="" className='w-[100%] h-[100%] lg:h-[80%] lg:w-[80%] ' />
                    </div>
                    <div className='w-[100%] h-[50%] lg:h-[100%]   flex flex-col justify-center lg:justify-start lg:pt-[5%] items-center text-center lg:text-start font-thin text-sm lg:text-2xl text-[#c266d3]  ' >
                        <p>Our goal is simple: to make learning accessible, engaging, and effective for all students. We aim to bridge the gap between traditional learning methods and modern technological advancements by offering a platform that adapts to each student's unique learning pace and style.</p>
                        <p className=' lg:flex lg:my-[2%] ' >At EduChamp, we understand that each student learns differently. That's why we've designed our platform to adapt to individual needs, providing personalized feedback and recommendations that help students improve continuously.</p>
                        <p className='hidden lg:flex  lg:my-[2%]'>At EduChamp, we understand that each student learns differently. That's why we've designed our platform to adapt to individual needs, providing personalized feedback and recommendations that help students improve continuously. Our mission is to foster a love for learning, encourage critical thinking, and build a strong foundation in mathematics that students can carry forward into higher education and beyond.</p>
                    </div>
                </div>
            </div>
            <div className='w-[100vw] h-[100vh]    font-montserrat px-[5%] ' >
                <div className='w-[100%] h-[10%]   flex justify-center items-center text-center font-bold text-xl lg:text-4xl ' >
                    <p>Join Us!</p>
                </div>
                <div className='w-[100%] h-[90%]   flex flex-col lg:flex-row justify-center items-center text-center font-bold text-xl ' >
                    <div className='w-[100%] h-[60%] lg:h-[100%]    flex justify-center items-center ' >
                        <img src="/images/joinusimg.png" alt="" className='w-[100%] h-[100%] lg:h-[80%] lg:w-[70%] ' />
                    </div>
                    <div className='w-[100%] h-[40%] lg:h-[100%]   flex flex-col justify-center lg:justify-start lg:pt-[5%] items-center text-center lg:text-end font-thin text-sm lg:text-2xl text-[#c266d3] ' >
                        <p>EduChamp is more than just a learning tool; it's a community dedicated to educational excellence. We invite students, parents, and educators to join us in our mission to revolutionize learning through technology.</p>
                        <p className=' lg:flex lg:my-[2%] ' >Whether you're a student looking to improve your math skills, a parent seeking effective educational resources for your child, or an educator interested in innovative teaching tools, EduChamp has something to offer. </p>
                        <p className='hidden lg:flex  lg:my-[2%]'>Together, let's champion the future of education with EduChamp!Thank you for choosing EduChamp. We look forward to being a part of your educational journey.

                            Feel free to further customize or expand any sections as needed to better reflect the specific features and values of your platform.</p>
                    </div>
                </div>
            </div>
            <div className='w-[100vw] h-[50vh] bg-black ' >
                <Footer/>                
            </div>

        </>
    )
}

export default About
