import React, { Children } from 'react'

const Input = ({
  type='text', 
  id='',
  value='',
  placeholder = '',
  label = '',
  error = '',
  onChange,


}) => {


  return (
    <div className='flex flex-col gap-1'>
      <label htmlFor={id} className='text-lg text-muted'>
        {label}
      </label>
      <input
        type = {type}
        value = {value}
        id = {id}
        placeholder={placeholder}
        onChange={onChange}
        className='bg-secondary text-text border border-border rounded-lg px-3 py-3 text-base 
        focus:outline-none focus:border-primary
        placeholder:text-muted'
      
      />
      {error && (
        <p className='text-danger text-xs'>{error}</p>
      )}


    </div>
    
    
  )
}

export default Input