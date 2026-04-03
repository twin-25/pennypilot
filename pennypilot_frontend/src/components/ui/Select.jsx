// src/components/ui/Select.jsx
import React from 'react'

const Select = ({
  id = '',
  value = '',
  label = '',
  error = '',
  disabled = false,
  onChange,
  options = [], // [{ value: 'CASH', label: 'Cash' }]
}) => {
  return (
    <div className='flex flex-col gap-1'>
      <label htmlFor={id} className='text-lg text-muted'>
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        disabled = {disabled}
        className='bg-secondary text-text border border-border 
                   rounded-lg px-3 py-3 text-base
                   focus:outline-none focus:border-primary
                   cursor-pointer'
      >
        <option value=''>Select...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className='text-danger text-xs'>{error}</p>
      )}
    </div>
  )
}

export default Select