import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { store } from './components/redux/store'
import {Provider} from 'react-redux'
import Home from './components/Home.jsx'
import App from './App.jsx'
import ExpenseList from './components/ExpenseList.jsx'
import GraphPage from './components/GraphPage.jsx'
import { createBrowserRouter, createRoutesFromElements, RouterProvider ,Route} from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<App />} > 
      <Route index element={<Home />} /> 
      <Route path='allEntries' element={<ExpenseList />} />
      <Route path="/graph" element={<GraphPage  />} />
      </Route>            
      
    </>
  )
);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
    
  
  </StrictMode>,
)
