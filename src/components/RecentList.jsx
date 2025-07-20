import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import List from './List';

function ExpenseList() {
  //   console.log(expenselist)
  const expenselist = useSelector((state) => state.expense);
  const recent = expenselist.slice(-3).reverse();
  const navigate = useNavigate();

  const btnVisible = (expenselist.length > 0) ? true : false;
  const allEntriesBtnVisible = (expenselist.length > 3) ? true : false;

  return (
    <div className='flex flex-col gap-1'>
      <p className={`w-2/5 mb-2 text-yellow-500/80 ${btnVisible ? '' : 'hidden'}`}>recent {recent.length} entries</p>
      {recent.map((item) => (

        <List item={item} />

      ))}

      <div className={`flex gap-8 mt-5 ${btnVisible ? '' : 'hidden'}`}>
        <button className={`bg-blue-500 py-2 active:scale-75 active:bg-blue-600 transition duration-700 cursor-pointer rounded-2xl px-2 w-1/2 `}
          onClick={() => navigate('/graph')}>See graph</button>
        <Link to='allEntries' className={`bg-blue-500 py-3  active:scale-75 active:bg-blue-600 transition duration-700 cursor-pointer rounded-2xl w-1/2 ${allEntriesBtnVisible ? '' : 'hidden'} `} >View All</Link>
      </div>
    </div>
  )
}

export default ExpenseList