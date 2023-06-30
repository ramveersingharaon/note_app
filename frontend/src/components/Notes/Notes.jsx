import React, { useState, useEffect } from 'react'
import './Notes.css'
import { useSelector } from 'react-redux'
import { FaEdit } from 'react-icons/fa'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { createNote, deleteNote, updateNote, getNotes } from '../../redux/actions/noteAction'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'

const Notes = ({ toggleForm, setToggleForm }) => {
    const navigate = useNavigate()
    const { message, error } = useSelector(state => state.note)

    const dispatch = useDispatch()
    const { notes } = useSelector(state => state.note)

    const initialState = {
        title: "",
        body: "",
    }

    const [note, setNote] = useState(initialState)
    const [toggleEditForm, setToggleEditForm] = useState(false)
    const [editNote, setEditNote] = useState({ eTitle: "", eBody: "" })

    function onChageHandler(e) {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    async function handleAdd() {
        setToggleForm(!toggleForm)
        await dispatch(createNote(note))
        dispatch(getNotes())

        setNote(initialState)
        console.log(note)
    }

    function editOnChangeHandler(e) {
        console.log()
        setEditNote({ ...editNote, [e.target.name]: e.target.value })
    }

    async function submitEdit() {
        setToggleEditForm(!toggleEditForm)

        const note = {
            title: editNote.eTitle,
            body: editNote.eBody
        }
        const id = editNote._id
        console.log(note, id)
        await dispatch(updateNote(id, note))
        dispatch(getNotes())
        console.log(editNote)

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
    }, [error, message, dispatch])


    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate('/login')
        }
    }, [])

    return (
        <div className='notes'>

            <div className={toggleEditForm ? "editNote" : "editNote active"}>
                <div className="editFormContainer">
                    <h1>Edit Note</h1>
                    <form className="editForm">
                        <input type="text" name='eTitle' value={editNote.eTitle} placeholder='Edit Title' onChange={editOnChangeHandler} />
                        <textarea name="eBody" value={editNote.eBody} placeholder=' Edit Message' onChange={editOnChangeHandler} />
                    </form>
                    <button onClick={submitEdit}>Submit</button>
                </div>
            </div>


            <div className={toggleForm ? "addNote" : "addNote active"}>
                <div className="formContainer">
                    <h1 style={{ color: "white" }}>Add Note</h1>
                    <form className="form">
                        <input type="text" name='title' value={note.title} placeholder='Title' onChange={onChageHandler} />
                        <textarea name="body" value={note.body} placeholder=' Message' onChange={onChageHandler} />
                    </form>
                    <button onClick={handleAdd}>Submit</button>
                </div>
            </div>


            {
                notes && notes.map((element) => {
                    const id = element._id

                    async function handleDelete() {
                        await dispatch(deleteNote(id))
                        dispatch(getNotes())
                    }

                    function handleEdit() {
                        setToggleEditForm(!toggleEditForm)
                        setEditNote({ eTitle: element.title, eBody: element.body, _id: element._id })
                    }

                    return <div className='note' key={element._id}>
                        <h3>{element.title}</h3>
                        <p>{element.body}</p>
                        <div className='delete' onClick={handleDelete}><RiDeleteBin5Fill /></div>
                        <div className='edit' onClick={handleEdit}  ><FaEdit /></div>
                    </div>
                })
            }
        </div>
    )
}

export default Notes
