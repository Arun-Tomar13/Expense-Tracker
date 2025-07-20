import React, { useState, useEffect } from 'react'
import { addExpense } from './redux/expenseSlice';
import { useDispatch, useSelector } from 'react-redux'

function Expense() {

    const [total, setTotal] = useState(0);
    const [expense, setExpense] = useState(0);
    const [salary, setSalary] = useState(0);
    const [amount, setAmount] = useState();
    const [date, setDate] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('salary')
    const [percentage, setPercentage] = useState(0)
    // console.log(percentage)

    const dispatch = useDispatch();
    const expensesFromRedux = useSelector((state) => state.expense);

    const findPercentage = (salary, expense) => {
        if (salary === expense || (salary === 0 && expense === 0)) return 50;
        if (salary === 0) return 0;
        if (expense === 0) return 100;

        const ratio = salary / expense;
        const logRatio = Math.log2(ratio);

        const value = 50 + 25 * logRatio;

        return Math.max(0, Math.min(100, Math.round(value)));
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!amount) return

        const time = new Date().toTimeString().split(' ')[0]

        const newExpence = {
            amount: amount,
            type: category,
            date: date,
            time: time,
            description: description,
            id: time
        }
        dispatch(addExpense(newExpence))
        setAmount('');
        setDescription('');
    }

    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        setDate(formattedDate)

        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        const salaryAmount = expenses
            .filter(e => e.type === 'salary')
            .reduce((sum, item) => sum + item.amount, 0);
        const expenseAmount = expenses
            .filter(e => e.type === 'expense')
            .reduce((sum, item) => sum + item.amount, 0);

        setSalary(salaryAmount);
        setExpense(expenseAmount);
        setTotal(salaryAmount - expenseAmount);
        setPercentage(() => findPercentage(salaryAmount, expenseAmount))

    }, [expensesFromRedux]);

    return (
        <div className="m-2 mb-10">
            <div className='mt-5 mb-10'>
                <h2 className='text-3xl text-blue-500 mb-4'>Total :  {total}</h2>
                <div className='flex justify-center-safe gap-10 mb-3'>
                    <p className='text-red-500'>Expense : {expense}</p>
                    <p className='text-green-500'>Salary : {salary}</p></div>
                <input min={0} max={100} value={percentage} type="range" id='range' disabled className='appearance-none w-4/5 h-1.5 rounded-2xl bg-gradient-to-r from-red-600 to-green-500 cursor-pointer' />
            </div>

            <hr className='mb-7 text-pink-400' />

            <form onSubmit={handleSubmit} className='flex flex-wrap flex-col gap-3'>
                {/* <p className='mb-3 text-amber-700 py-1 bg-amber-300 rounded-4xl justify-self-center'>Add entry</p> */}
                <div className='flex gap-4 '>
                    <input type="number"
                        value={amount}
                        placeholder='enter a amount'
                        className='border-2 rounded-xl py-1 px-4 border-pink-800'
                        onChange={e => { setAmount(Number(e.target.value)); }} />
                    <select name="category" id="category" className='border-2 border-pink-800  p-2 rounded-xl' onChange={e => setCategory(e.target.value)} >
                        <option value="salary" className='bg-zinc-800'>salary</option>
                        <option value="expense" className='bg-zinc-800'>expense</option>
                    </select>
                </div>
                <div className=''>
                    <input id='description' type="text" placeholder='description' className='border-2 w-full p-2 rounded-xl overflow-hidden border-pink-800' value={description}
                        onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div className='flex gap-4'>
                    <input type="date" className='border-2 border-pink-800 cursor-pointer rounded-xl w-1/2 px-2'
                        value={date}
                        onChange={(e) => setDate(e.target.value)} />
                    <button className='w-1/2  py-3 rounded-xl bg-gradient-to-br from-pink-600 via-purple-500 to-indigo-700   active:scale-75  transition duration-700 cursor-pointer'>Enter</button>
                </div>
            </form>

        </div>
    )
}

export default Expense;