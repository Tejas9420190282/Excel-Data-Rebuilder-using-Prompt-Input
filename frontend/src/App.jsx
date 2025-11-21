import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import Home from './page/Home';
import History from './page/History';

function App() {
  
  const router = createBrowserRouter([
    {
      path : "/",
      element : <Home />
    },
    {
      path : "/history",
      element : <History />
    },
  ])

  return (
    <>
        <RouterProvider router={router} />
    </>    
  )
}

export default App
