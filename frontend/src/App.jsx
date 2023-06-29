import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './components/Home'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Notes from './components/Notes/Notes'
import { useDispatch } from 'react-redux'
import { getNotes } from './redux/actions/noteAction'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'

const App = () => {

  const dispatch = useDispatch()
  const { isAuthentication } = useSelector(state => state.note)
  const [toggleForm, setToggleForm] = useState(false)


  useEffect(() => {
    dispatch(getNotes())
  }, [dispatch])




  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Header toggleForm={toggleForm} setToggleForm={setToggleForm} />
        <Routes>
          <Route path='/' element={<Home />} />
          {!isAuthentication ? <Route path='/register' element={<Register />} /> : null}
          {!isAuthentication ? <Route path='/login' element={<Login />} /> : null}

          <Route path='/notes' element={<Notes toggleForm={toggleForm} setToggleForm={setToggleForm} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
