import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    isLoaded: false,
    data: []
}


const categoriesSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateCategories: (state, action) => {
            return {
                isLoaded: true,                
                data:action.payload
            }
        }
    }
})

export const { updateCategories } = categoriesSlice.actions
export default categoriesSlice.reducer
