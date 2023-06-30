import API from '../../API'
export const getNotes = () => async (dispatch) => {
    try {
        dispatch({ type: "GET_NOTES_REQUEST" })
        const { data } = await API.get('/note/notes')
        dispatch({ type: "GET_NOTES_SUCCESS", payload: data })

    } catch (error) {
        console.log(error)
        dispatch({ type: "GET_NOTES_FAIL", payload: error.response.data.message })
    }
}

export const createNote = (note) => async (dispatch) => {
    try {
        dispatch({ type: "CREATE_NOTES_REQUEST" })
        const { data } = await API.post("/note/create", note);

        dispatch({ type: "CREATE_NOTES_SUCCESS", payload: data })
    } catch (error) {
        console.log(error)
        dispatch({ type: "CREATE_NOTES_FAIL", payload: error.response.data.message })
    }
}
export const deleteNote = (id) => async (dispatch) => {
    try {
        dispatch({ type: "CREATE_NOTES_REQUEST" })
        const { data } = await API.delete("/note/delete", {
            headers: {
                id: id
            }
        });
        console.log(data)
        dispatch({ type: "CREATE_NOTES_SUCCESS", payload: data })
    } catch (error) {
        dispatch({ type: "CREATE_NOTES_FAIL", payload: error.response.data.message })
    }
}
export const updateNote = (id, note) => async (dispatch) => {
    try {
        dispatch({ type: "EDIT_NOTES_REQUEST" })
        const { data } = await API.patch("/note/update", note, {
            headers: {
                id: id
            }
        });
        console.log(data)
        dispatch({ type: "EDIT_NOTES_SUCCESS", payload: data })
    } catch (error) {
        dispatch({ type: "EDIT_NOTES_FAIL", payload: error.response.data.message })
    }
}