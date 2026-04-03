import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from "../store/slices/authSlice"
import { useState } from 'react'
import { useEffect } from 'react'

import useNotifications from '../hooks/useNotifications'
import { FiBell} from 'react-icons/fi'
import { useGetNotificationsQuery } from '../store/services/notificationsApi'

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.auth.user)
  const { unreadCount } = useNotifications()
  console.log(unreadCount)
  const [isOpen, setIsOpen] = useState(false)
  const {data} = useGetNotificationsQuery()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

useEffect(() => {
  const handleClickOutside = () => setIsOpen(false)
  document.addEventListener('click', handleClickOutside)
  return () => document.removeEventListener('click', handleClickOutside)
}, [])

  return (
    <nav className="bg-surface fixed w-full z-20 top-0 inset-s-0 border-b border-border">
      <div className="max-w-7xl flex items-center justify-between mx-auto p-4">
        
        {/* Logo */}
        <Link to='/dashboard' className="flex items-center space-x-2">
          <span className="text-2xl"><img src="/penny-pilot-logo.svg" alt="Penny Pilot" width="48" height="48" /></span>
          <span className="text-xl text-primary font-bold">PennyPilot</span>
        </Link>

        {/* Nav Links */}
        <ul className="hidden md:flex items-center space-x-8">
          <li>
            <Link to='/dashboard' className="text-muted hover:text-primary transition-colors">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to='/transactions' className="text-muted hover:text-primary transition-colors">
              Transactions
            </Link>
          </li>
          <li>
            <Link to='/budgets' className="text-muted hover:text-primary transition-colors">
              Budgets
            </Link>
          </li>
          <li>
            <Link to='/ai-tips' className="text-muted hover:text-primary transition-colors">
              AI Tips
            </Link>
          </li>

          <li>
            <Link to='/profile' className="text-muted hover:text-primary transition-colors">
              Profile
            </Link>
          </li>
        </ul>


        <div className='relative'>
          <div className='relative cursor-pointer on'
          onClick={(e)=>{
            e.stopPropagation()
            setIsOpen(!isOpen)
          }}
          >
        <FiBell className='text-muted' size={20}/>
          
          {unreadCount > 0 && (
          <span className='absolute -top-1 -right-1 bg-danger text-white 
                           text-xs rounded-full w-4 h-4 flex items-center 
                           justify-center'>
            {unreadCount}
          </span>
          
        )}
        {isOpen &&(
          <div className='absolute top-8 right-0 bg-surface border border-border rounded-xl w-80 z-50 shadow-lg max-h-100 overflow-y-auto scrollbar-hide '>
            {data?.slice(0,5).map((notification)=>(
                <div key = {notification.id}
                          className={`flex items-center justify-between p-4 border-b ${notification.is_read ? 'bg-surface':'bg-secondary'}`}
                        >
                          <div>
                            <p className='text-text'>{notification.message}</p>
                            <p className='text-muted text-xs'>{
                new Date(notification.created_at).toLocaleDateString()}</p>
                          </div>
                        </div>

            
            ))
            }
            <div className='p-3 text-center'>
            <Link to='/notifications' className='text-primary text-sm hover:opacity-80'>View All ...</Link>
            </div>
          </div>
        )}
        </div>
      </div>

        {/* Right — User + Logout */}
        <div className="flex items-center gap-4">
          <span className="text-muted text-sm hidden md:block">
            Welcome, {user?.name}!
          </span>
          <button
            onClick={handleLogout}
            className="text-sm text-danger hover:opacity-80 transition-opacity cursor-pointer"
          >
            Logout
          </button>
        </div>

      </div>
    </nav>
  )
}

export default Navbar