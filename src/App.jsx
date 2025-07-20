import { Outlet } from 'react-router-dom'
import './App.css'
import Expense from './components/Expense'
import RecentList from './components/RecentList'

function App() {

  return (
    
      <div className='border w-md border-purple-300 rounded-sm p-4'>
        <Outlet/>
      </div>
  )
}

export default App
