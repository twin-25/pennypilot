import { useEffect, useState } from "react";
import {useSelector} from 'react-redux'

import React from 'react'

const useNotifications = () => {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const token = useSelector(state => state.auth.token)

  useEffect(()=>{
    if(!token) return
    const socket = new WebSocket(
      `ws://localhost:8000/ws/notifications/?token=${token}`
    )

    socket.onopen = () =>{
      console.log('WebSocket connected')
    }

    socket.onmessage = (event) =>{
      const data = JSON.parse(event.data)

      setNotifications(prev=>[data, ...prev])

      setUnreadCount(prev =>prev + 1)
    }

    socket.onerror = (error) =>{
      console.log('Websocket error:', error)
    }
    return () =>{
      socket.close()
    }
  }, [token])
  return {notifications, unreadCount, setUnreadCount}

}

export default useNotifications