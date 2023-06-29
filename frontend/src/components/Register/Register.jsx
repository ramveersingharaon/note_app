import React, { useEffect, useState } from 'react'
import './Register.css'
import { useDispatch } from 'react-redux'
import { register } from '../../redux/actions/userAction'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux'

const Register = () => {
    const { message, error } = useSelector(state => state.user)


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const initialState = {
        name: "",
        email: "",
        password: ""
    }
    const [form, setForm] = useState(initialState)
    const onChangeHandler = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    const registerHandler = async () => {
        await dispatch(register(form))
        console.log(form)
        setForm(initialState)
        navigate('/login')
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
        <div className='register login'>
            <div className="formContainer">
                <h1>Register Now</h1>
                <form className='form'>
                    <input type="text" name='name' placeholder='Name' value={form.name} onChange={onChangeHandler} />
                    <input type="email" name='email' placeholder='Email' value={form.email} onChange={onChangeHandler} />
                    <input type="password" name='password' placeholder='Password' value={form.password} onChange={onChangeHandler} />
                </form>
                <button onClick={registerHandler}>Submit</button>

            </div>
        </div>
    )
}

export default Register
