import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import Profile from "./components/Profile.jsx"
import { Route, Router, Routes } from 'react-router'
import Explore from './components/Explore.jsx'
import Navbar from './components/Navbar.jsx'
import Chatbot from './components/chatbot.jsx'
import UploadProject from './components/UploadProject.jsx'
import ContactMe from './components/ContactMe.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <Navbar/>
      <Routes>

        <Route path="/" element={<Profile />} />
        <Route path="/explore" element={<Explore/>}/>
        <Route path="/chat" element={<Chatbot/>}/>
        <Route path="/upload-project" element={<UploadProject/>}/>
        <Route path="/contact-me" element={<ContactMe/>} />
      </Routes>
   
    </>
  )
}

export default App
