import { removeExpense } from './redux/expenseSlice'
import { useDispatch } from 'react-redux'


function List({ item }) {

    const dispatch = useDispatch();

    return (
        <div key={item.id} className='flex rounded-2xl bg-purple-400/20 border-1 border-purple-500 hover:scale-98 transition duration-500'>
            <div className='flex justify-center w-5/6 align-middle gap-10 p-2 '>

                <div >
                    <p className='mb-1 text-sm'>{item.description}</p>
                    <div className='flex gap-3'>
                        <p className='text-xs'>{item.date}</p>
                        <p className='text-xs'>🕝 {item.time}</p>
                    </div>
                </div>

                <h3 className={`${item.type == 'salary' ? 'text-green-400' : 'text-red-500'} font-bold`}>{item.type == 'salary' ? '+' : '-'}&nbsp;{item.amount}</h3>

            </div>

            <button className='w-1/6  bg-orange-600 rounded-r-2xl pl-3 text-black text-3xl active:bg-red-400  transition duration-700 cursor-pointer'
                onClick={() => dispatch(removeExpense(item.id))}
            ><svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#D9D9D9"><path d="M267.33-120q-27.5 0-47.08-19.58-19.58-19.59-19.58-47.09V-740h-7.34q-14.16 0-23.75-9.62-9.58-9.61-9.58-23.83 0-14.22 9.58-23.72 9.59-9.5 23.75-9.5H352q0-14.33 9.58-23.83 9.59-9.5 23.75-9.5h189.34q14.16 0 23.75 9.58 9.58 9.59 9.58 23.75h158.67q14.16 0 23.75 9.62 9.58 9.62 9.58 23.83 0 14.22-9.58 23.72-9.59 9.5-23.75 9.5h-7.34v553.33q0 27.5-19.58 47.09Q720.17-120 692.67-120H267.33Zm425.34-620H267.33v553.33h425.34V-740ZM398.12-270.67q14.21 0 23.71-9.58t9.5-23.75v-319.33q0-14.17-9.61-23.75-9.62-9.59-23.84-9.59-14.21 0-23.71 9.59-9.5 9.58-9.5 23.75V-304q0 14.17 9.61 23.75 9.62 9.58 23.84 9.58Zm164 0q14.21 0 23.71-9.58t9.5-23.75v-319.33q0-14.17-9.61-23.75-9.62-9.59-23.84-9.59-14.21 0-23.71 9.59-9.5 9.58-9.5 23.75V-304q0 14.17 9.61 23.75 9.62 9.58 23.84 9.58ZM267.33-740v553.33V-740Z" /></svg></button>
        </div>
    )
}

export default List