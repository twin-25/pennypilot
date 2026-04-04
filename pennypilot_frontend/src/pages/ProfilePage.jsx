import React from 'react'
import {useState, useEffect} from 'react'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import PennyPilotLogo from '../components/ui/PennyPilotLogo'
import Loader from '../components/ui/Loader'
import {useGetProfileQuery, useUpdateUserProfileMutation} from '../store/services/UserApi'
import Navbar from '../components/Navbar'

const ProfilePage = () => {
  const {data:profile, isLoading} = useGetProfileQuery()
  const [updateProfile, {isLoading:updating, error}] = useUpdateUserProfileMutation()
  const [formData, setFormData] = useState({
    first_name:'',
    last_name:'',
    username: '',
    date_of_birth:'',
    password:'',
  })
  const [confirmPassword, setConfirmPassword] = useState('')
  useEffect(()=>{
    if(profile){
      setFormData({
        first_name:profile.first_name || '',
        last_name: profile.last_name || '',
        username: profile.username || '',
        date_of_birth: profile.date_of_brith || '',
      })
    }
  }, [profile])
  
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password === confirmPassword){
      await updateProfile(formData).unwrap()
    }
    else{
      console.log(err)
    }
  }

  return (
    <div className='min-h-screen bg-background flex flex-col'>
      {isLoading && <Loader text='Finding out who you really are...'/>}

      
      <Navbar/>

      
      <div className='bg-surface flex flex-1 items-center justify-center w-full'>
        <div className='w-full max-w-sm flex flex-col gap-6 px-4'>

          <h2 className='text-2xl font-bold text-white'>Hey ${profile?.first_name} </h2>

          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <Input
              label='First Name'
              type='text'
              value={formData.first_name}
              placeholder='Enter Your First_name'
              error={error?.profile?.first_name?.[0]}
              onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
            />

            <Input
              label='Last Name'
              type='text'
              value={formData.last_name}
              placeholder='Enter Your Last Name'
              error={error?.profile?.last_name?.[0]}
              onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
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
              label='Date Of Birth'
              type='date'
              value={formData.date_of_birth}
              placeholder='Enter Your Date Of Birth'
              error={error?.profile?.date_of_birth?.[0]}
              onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
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
              error={formData.password !== confirmPassword && confirmPassword ? 'Passwords do not match' : ''}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button type='submit' disabled={updating}>
              {isLoading ? 'Updating account...' : 'Upadate'}
            </Button>
          </form>

        </div>
      </div>

    </div>
  )
}

export default ProfilePage