import React from 'react'

const Button = ({children, variant='primary', type = 'button', onClick, disabled}) => {

  const base = 'px-3 py-1.5 text-sm md:px-4 md:py-2 md:text-base rounded-lg font-medium cursor-pointer transition-all active:scale-95 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed'


  const variants = {
    primary: 'bg-primary text-white',
    danger: 'bg-danger text-white',
    outline: 'border border-primary text-primary'
  }
  

  return (
    <button onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]}`}
    type={type}
    >
      {children}
    </button>
  )
}

export default Button