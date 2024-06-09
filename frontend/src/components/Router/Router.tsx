import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Auth from '../Auth/Auth'
import Dashboard from '../Dashboard/Dashboard'
import Quiz from '../Quiz/Quiz'
import Results from '../Results/Results'
import Result from '../Result/Result'
import About from '../About/About'
import Profile from '../Profile/Profile'

const Router:React.FC = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/results" element={<Results />} />
        <Route path="/quiz/:username" element={<Quiz />} />
        <Route path="/result/:id" element={<Result />} />
        <Route path="/about-us" element={<About />} />
        <Route path='/profile' element={<Profile/>} />
    </Routes>
    </>
  )
}

export default Router