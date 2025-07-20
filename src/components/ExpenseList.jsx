import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CSVLink } from 'react-csv'
import List from './List'

function ExpenseList() {
  const [field, setField] = useState('')
  const [search, setSearch] = useState('')
  const expenselist = useSelector((state) => state.expense);
  const [filter, setFilter] = useState([]);
  let downloadBtnVisible = (filter.length > 0) ? '' : 'hidden';

  const header = [
    { label: 'date', key: 'date' },
    { label: 'time', key: 'id' },
    { label: 'category', key: 'type' },
    { label: 'description', key: 'description' },
    { label: 'amount', key: 'amount' }
  ]

  const csvData = {
    filename: 'Entries',
    headers: header,
    data: filter
  }
  // console.log(csvData)

  useEffect(() => {
    // console.log(field)
    // console.log(search)
    if (field.length > 0) {
      let temp = expenselist.filter((item) => (
        item[field] == search
      ))
      setFilter(temp)
      // console.log('arun')
    }
    else {
      setFilter(expenselist);
      // console.log('tomar')
    }
    // console.log('hello')
  }, [field, search, expenselist])

  return (
    <div className='flex flex-col gap-1'>

      <div className='flex gap-10'>
        <Link to="/" className=" mt-2 ml-4 mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Back to home</Link>

        <CSVLink className={` ${downloadBtnVisible} w-2/4 mt-2 mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition`} {...csvData}>Download entries  ⬇ </CSVLink>
      </div>

      <div className='flex gap-4 m-2 mb-5 transition duration-500'>
        <select name='field' id='field' className='border-1 rounded-xl p-2 w-2/6 text-zinc-200 bg-zinc-700'
          onChange={(e) => setField(e.target.value)}>
          <option disabled hidden selected>choose field</option>
          <option value="type">Category</option>
          <option value="date">date</option>
          <option value="description">description</option>
        </select>
        <input type="text" className='border-1 w-4/6 rounded-xl p-2 bg-zinc-700 text-zinc-200 pl'
          onChange={(e) => setSearch(e.target.value)}
          placeholder='search' />
      </div>

      <p className={` ${filter.length > 0 ? 'hidden' : ''} text-yellow-500/80 `} >* please enter the spelling correctly.</p>

      {filter.map((item) => (
        <List item={item} />
      ))}

    </div>
  )
}

export default ExpenseList