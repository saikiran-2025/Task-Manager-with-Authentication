import React from 'react'
import { BrowserRouter,Route,Routes } from "react-router-dom"
import { useState } from 'react'
import Login from './Comp/Login'
import Register from './Comp/Register'
import Reset_pwd from './Comp/Reset_pwd'
import Add_task from './Comp/Add_task'
import Upcoming_task from './Comp/Upcoming_task'
import Completed_task from './Comp/Completed_task'
import Missed_task from './Comp/Missed_task'
import Footer from './Comp/Footer'
import Logout from './Comp/Logout'
import Nav from './Comp/Nav'
import Ct from './Comp/Ct'
import "./App.css"
const App = () => {
  const [token,setToken]=useState("")
  const [user,setUser]=useState(null);

  const obj={token,setToken,user,setUser}

  return (
    <BrowserRouter>
    <Ct.Provider value={obj}>
      <Nav/>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/resetpwd" element={<Reset_pwd />}/>
        <Route path="/addtask" element={<Add_task />}/>
        <Route path="/upcomingtask" element={<Upcoming_task />}/>
        <Route path="/completedtask" element={<Completed_task />}/>
        <Route path="/missedtask" element={<Missed_task />}/>
        <Route path='/logout' element={<Logout />}/>
      </Routes>
      {token && <Footer />}
    </Ct.Provider>
    </BrowserRouter>
  )
}

export default App