import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import './Header.css'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { getNotes } from '../../redux/actions/noteAction';
import { GiNotebook } from 'react-icons/gi'

const Header = ({ setToggleForm, toggleForm }) => {
    const navigator = useNavigate()
    const dispatch = useDispatch()
    const { isAuthentication } = useSelector(state => state.note)

    const [toggleNav, setToggleNav] = useState(true)


    const handleLogout = async (e) => {
        e.preventDefault();
        await localStorage.removeItem("token")
        dispatch(getNotes())
        navigator('/login')
    }




    return (
        <>
            <div className={toggleNav ? " header active" : 'header'}>
                <div className="logo"><GiNotebook className='logoIcon' /></div>
                <div className="nav">
                    <ul className="ul" onClick={() => setToggleNav(!toggleNav)}>
                        <Link to='/' className='link' >   <li>Home</li></Link>
                        {!isAuthentication ? <Link to='/register' className='link' >   <li>Register</li></Link> : null}
                        {!isAuthentication ? <Link to='/login' className='link' >   <li>Login</li></Link> : null}
                        {isAuthentication ? <Link to='/notes' className='link' >   <li>All Notes</li></Link> : null}
                        {isAuthentication ? <Link to='/login' className='link' >  <li onClick={handleLogout}>Logout</li></Link> : null}
                    </ul>

                    {isAuthentication ? <div><button className='btn' onClick={() => setToggleForm(!toggleForm)}>Add Note</button></div> : null}

                    <div className="icons" onClick={() => { setToggleNav(!toggleNav) }}>
                        <b > <IoMdClose className='close' /></b>
                        <b><FaBars className='bars' /></b>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Header
