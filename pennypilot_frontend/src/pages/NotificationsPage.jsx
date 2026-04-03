import React from 'react'
import { useDeleteNotificationMutation, useGetNotificationsQuery, useMarkAsReadMutation } from '../store/services/notificationsApi'
import Navbar from '../components/Navbar'
import {CiRead } from 'react-icons/ci'
import { MdDeleteOutline } from "react-icons/md";
import Loader from '../components/ui/Loader';
import Card from '../components/ui/Card'

const NotificationsPage = () => {
  const {data, isLoading} = useGetNotificationsQuery()
  const [markAsRead] = useMarkAsReadMutation()
  const [deleteNotification] = useDeleteNotificationMutation()
  return (
    <div className='min-h-screen bg-background pt-20 p-6'>
      <Navbar/>
      {isLoading && <Loader text = 'Delivering bad news professionally... 📬'/>}
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-text text-2xl font-bold'>Notifications</h1>
      </div>
      <Card>
      {data?.map((notification) =>(
        <div key = {notification.id}
          className={`flex items-center justify-between p-4 border-b ${notification.is_read ? 'bg-surface':'bg-secondary'}`}
        >
          <div>
            <p className='text-text'>{notification.message}</p>
            <p className='text-muted text-xs'>{
new Date(notification.created_at).toLocaleDateString()}</p>
          </div>

          <div className='flex gap-3'>
            {!notification.is_read && (<CiRead
            className = 'text-success cursor-pointer hover:opacity-80'
            size={16}
            onClick = {()=>markAsRead(notification.id)}
            />)}
            <MdDeleteOutline
            className='text-danger cursor-pointer hover:opacity-80'
            size={16}
            onClick={()=>deleteNotification(notification.id)}
            />
          </div>
        </div>
      ))}

        {data?.length === 0 && (
          <p className='text-muted text-center py-8'>No notifications yet!</p>
        )}

    </Card>

    </div>
  )
}

export default NotificationsPage