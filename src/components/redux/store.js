import {configureStore} from '@reduxjs/toolkit'
import { addExpense,removeExpense } from './expenseSlice'
import reducer from './expenseSlice'

export const store = configureStore({
    reducer:reducer

});