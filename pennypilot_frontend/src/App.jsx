import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import './App.css'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import TransactionsPage from './pages/TransactionsPage'
import Modal from './components/Modal'
import NotificationsPage from './pages/NotificationsPage'
import BudgetsPage from './pages/BudgetsPage'
import ProfilePage from './pages/ProfilePage'
import AiPage from './pages/AiPage'
import UpgradePage from './pages/UpgradePage'

const PrivateRoutes = () =>{
  const token = localStorage.getItem('token')
  return token?<Outlet/>:<Navigate to='/login'/>
}

// // in your baseQuery setup
// const token = localStorage.getItem('token')
// if (token) {
//   const { exp } = JSON.parse(atob(token.split('.')[1])) // decode JWT payload
//   if (Date.now() >= exp * 1000) {
//     store.dispatch(logout())
//     localStorage.removeItem('token')
//     // optionally redirect
//   }
// }

function App() {
  

  return (
    
    <Router>
      <Routes>
        <Route path = '/register' element = {<RegisterPage/>}/>
        <Route path = '/login' element = {<LoginPage/>}/>

        <Route element={<PrivateRoutes/>}>
        <Route path='/dashboard' element={<DashboardPage/>}/>
        <Route path='/transactions' element={<TransactionsPage/>}/>
        <Route path ='/addTransaction' element={<Modal/>}/>
        <Route path ='/notifications' element={<NotificationsPage/>}/>
        <Route path ='/budgets' element={<BudgetsPage/>}/>
        <Route path = '/profile' element={<ProfilePage/>}/>
        <Route path = '/ai-tips' element={<AiPage/>}/>
        <Route path = '/upgrade' element={<UpgradePage/>}/>

        </Route>

        

      </Routes>
    </Router>
  )
}

export default App
