import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useGetNotificationsQuery } from '../store/services/notificationsApi'
import { api } from '../store/services/api'

const useNotifications = () => {
  const [unreadCount, setUnreadCount] = useState(0)
  const token = useSelector(state => state.auth.token)
  const dispatch = useDispatch()

  //  fetch from API — persists on refresh!
  const { data: notifications } = useGetNotificationsQuery(undefined, {
    skip: !token  // skip if not logged in
  })

  //  calculate unread from API data
  useEffect(() => {
    if (notifications) {
      const count = notifications.filter(n => !n.is_read).length
      setUnreadCount(count)
    }
  }, [notifications])

  //  WebSocket for real-time updates
  useEffect(() => {
    if (!token) return

    const socket = new WebSocket(
      `ws://localhost:8000/ws/notifications/?token=${token}`
    )

    socket.onopen = () => console.log('WebSocket connected ')

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      console.log('New notification:', data.message)
      // refetch from API → updates notifications list
      dispatch(api.util.invalidateTags(['Notifications']))
    }

    socket.onerror = (error) => console.log('WebSocket error:', error)

    return () => socket.close()

  }, [token])  // ← remove notifications from dependency!

  return { unreadCount, setUnreadCount }
}

export default useNotifications