import React, { useState, useEffect } from 'react'
import '../Register/Register.css'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/actions/userAction'
import { getNotes } from '../../redux/actions/noteAction'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'



const Login = () => {
    const navigate = useNavigate()
    const { error, message } = useSelector(state => state.user)



    const dispatch = useDispatch()
    const initialState = {
        email: "",
        password: ""
    }

    const [form, setForm] = useState(initialState)
    const onChangeHandler = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    const loginHandler = async () => {
        await dispatch(login(form))
        await dispatch(getNotes())
        console.log(form)
        setForm(initialState)



    }



    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch({ type: "CLEAR_ERROR" })
        }
        if (message) {
            toast.success(message)
            dispatch({ type: "CLEAR_MESSAGE" })
        }
    }, [error, message])
    return (

        <div className='login register'>
            <div className="formContainer">
                <h1>Login Now</h1>
                <form className='form'>
                    <input type="email" name='email' placeholder='Email' value={form.email} onChange={onChangeHandler} />
                    <input type="password" name='password' placeholder='Password' value={form.password} onChange={onChangeHandler} />
                </form>
                <button onClick={loginHandler}>Submit</button>

            </div>
        </div>
    )
}

export default Login
