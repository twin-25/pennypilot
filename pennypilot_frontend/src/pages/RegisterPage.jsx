import React, { useState } from 'react'
import { useCreateUserMutation } from '../store/services/UserApi'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import PennyPilotLogo from '../components/ui/PennyPilotLogo'
import Loader from '../components/ui/Loader'

const RegisterPage = () => {
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  })
  const [createUser, { isLoading, error }] = useCreateUserMutation()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    if (formData.password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      try {
        await createUser({ ...formData }).unwrap()
        navigate('/login')
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <div className='min-h-screen bg-background flex flex-col'>
      {isLoading && <Loader text='Building your financial runway...'/>}

      
      <div className='flex items-center justify-center w-full py-8'>
        <PennyPilotLogo />
      </div>

      
      <div className='bg-surface flex flex-1 items-center justify-center w-full'>
        <div className='w-full max-w-sm flex flex-col gap-6 px-4'>

          <h2 className='text-2xl font-bold text-white'>Create account</h2>

          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <Input
              label='Email'
              type='email'
              value={formData.email}
              placeholder='Enter Email'
              error={error?.data?.email?.[0]}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <Input
              label='Username'
              type='text'
              value={formData.username}
              placeholder='Enter username'
              error={error?.data?.username?.[0]}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />

            <Input
              label='Password'
              type='password'
              value={formData.password}
              placeholder='Enter password'
              error={error?.data?.password?.[0]}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />

            <Input
              label='Confirm Password'
              type='password'
              value={confirmPassword}
              placeholder='Confirm password'
              error={message}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button type='submit' disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Register'}
            </Button>
          </form>

          <p className='text-sm text-center' style={{ color: 'rgba(240,233,214,0.4)' }}>
            Already have an account?{' '}
            <span
              className='cursor-pointer'
              style={{ color: '#F5B528' }}
              onClick={() => navigate('/login')}
            >
              Sign in
            </span>
          </p>

        </div>
      </div>

    </div>
  )
}

export default RegisterPage