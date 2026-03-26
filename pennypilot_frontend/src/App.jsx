import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import './App.css'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'


const PrivateRoutes = () =>{
  const token = localStorage.getItem('token')
  return token?<Outlet/>:<Navigate to='/login'/>
}

function App() {
  

  return (
    
    <Router>
      <Routes>
        <Route path = '/register' element = {<RegisterPage/>}/>
        <Route path = '/login' element = {<LoginPage/>}/>

        <Route element={<PrivateRoutes/>}>
        <Route path='/dashboard' element={<DashboardPage/>}/>
        </Route>

      </Routes>
    </Router>
  )
}

export default App
