import './App.css';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';
import { Toaster } from 'react-hot-toast';

import {createBrowserRouter,RouterProvider} from 'react-router-dom'

const router=createBrowserRouter([
  {
    path:'/',
    element:<HomePage></HomePage>
  },
  {
    path:'/login',
    element:<Login></Login>
  },
  {
    path:'/signup',
    element:<Signup></Signup>
  },
])


function App() {
  return (

    <div className="App  h-screen items-center">
         <Toaster />
      <RouterProvider router={router}></RouterProvider>

    </div>
  );
}

export default App;
