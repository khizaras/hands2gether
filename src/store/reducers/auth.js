import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    isAuth: false,
    user: null,  
    error: null
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {    
        updateAuth: (state, action) => {
            return{
            ...state,
            ...action.payload
            }
        }
    }
})

export const { updateAuth } = authSlice.actions
export default authSlice.reducer
