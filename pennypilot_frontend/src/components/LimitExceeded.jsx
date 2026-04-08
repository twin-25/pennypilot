import React from 'react'
import { FaLock } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Card from './ui/Card';

const LimitExceeded = ({message, usage, limit, feature}) => {
  return (
    <Card>
      <div className=' flex flex-col items-center text-center py-8'>
        <FaLock className='mb-5 fill-red-600'/>
        <p className='text-text font-medium text-lg mb-2'>{message}</p>
        <p className='text-muted text-sm mb-6'>
          You have used {usage}/{limit} {feature} this Month
        </p>
        <Link 
        to='/upgrade'
        className='bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity'>
          Upgrade to Pro!!!
        </Link>
      </div>
    </Card>
  )
}

export default LimitExceeded