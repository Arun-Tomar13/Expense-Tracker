import {createSlice} from '@reduxjs/toolkit'
const initialState = {
  expense: JSON.parse(localStorage.getItem('expenses')) || [],
};

export const expenseSlice = createSlice({
    name:'expense',
    initialState,
    reducers:{
        addExpense : (state,action)=>{
            const newExpence = {
            amount:action.payload.amount,
            type:action.payload.type,
            date:action.payload.date,
            time:action.payload.time,
            id:action.payload.id,
            description:action.payload.description
            }
            state.expense.push(newExpence)
            localStorage.setItem('expenses',JSON.stringify(state.expense))
        },

         removeExpense: (state,action) =>{
            state.expense = state.expense.filter((item)=> item.id!== action.payload)
            localStorage.setItem('expenses',JSON.stringify(state.expense))
        }
    },
})

export const {addExpense,removeExpense} = expenseSlice.actions
export default expenseSlice.reducer;