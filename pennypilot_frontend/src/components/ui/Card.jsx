import React from 'react'

const Card = ({children,title, className=''}) => {
  return (
    <div className={`bg-surface border border-border rounded-xl p-6 ${className}`}>
      {title && <h2 className='text-text font-medium text-lg mb-4'>
        {title}
        </h2>}
      
      {children}</div>
  )
}

export default Card