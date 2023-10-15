import {RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import AuthPage from './components/AuthPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
      <>
      <RouterProvider router={appRouter}/>
      <ToastContainer/>
      </>
  );
}
const appRouter=createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/auth/user',
    element:<AuthPage/>
  }
])

export default App;
