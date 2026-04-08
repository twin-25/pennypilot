import React, { useState } from 'react'
import { useLoginUserMutation } from '../store/services/UserApi'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../store/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import PennyPilotLogo from '../components/ui/PennyPilotLogo'
import Input from '../components/ui/Input'
import Loader from '../components/ui/Loader'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginUser, {isLoading, error}] = useLoginUserMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async(e) =>{
    e.preventDefault()
    setLoginError('')
    try{
    const res = await loginUser({email, password}).unwrap()
    dispatch(setCredentials({token:res.access,refresh:res.refresh}))
    navigate('/dashboard')
    }catch(err){
      setLoginError(err?.data?.non_field_errors?.[0] || 'Invalid email or password')
    }
  }

  return (
    <div className='min-h-screen bg-background flex flex-col'>
      {isLoading && <Loader text='Preparing for takeoff...' />}
      <div className='flex items-center justify-center w-full py-8'>
        <PennyPilotLogo />
        </div>
      <div className='bg-surface flex flex-1 items-center justify-center w-full'>
        <div className='w-full max-w-sm flex flex-col gap-6 px-4'>
          <h2 className='text-2xl font-bold text-white'>Login</h2>
        <form onSubmit={handleSubmit}className='flex flex-col gap-4'>
          <Input type='text' value = {email} placeholder='Enter Email'
          onChange={(e)=>setEmail(e.target.value)}
          error = {error?.data?.email?.[0]
          }
          label = 'Email'
          ></Input>
          
          <Input type='password' value = {password} placeholder='Enter password'
          label = 'Password'
          onChange={(e)=>setPassword(e.target.value)}
          error = {error?.data?.password?.[0]}
          ></Input>
          {loginError && (
            <p className='text-sm text-danger'>{loginError}</p>
          )}
          <Button type='submit'>Login</Button>

          <p className='text-sm text-center' style={{ color: 'rgba(240,233,214,0.4)' }}>
            New User?{' '}
            <span
              className='cursor-pointer'
              style={{ color: '#F5B528' }}
              onClick={() => navigate('/login')}
            >
              Register
            </span>
          </p>
        </form>
      </div>
      </div>
    </div>
  )
}

export default LoginPage