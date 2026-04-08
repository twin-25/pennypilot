import React from 'react'
import { useCreateCheckoutMutation } from '../store/services/paymentsApi'
import Card from '../components/ui/Card'
import Navbar from '../components/Navbar'
import Button from '../components/ui/Button'
import Loader from '../components/ui/Loader'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { TiTick} from "react-icons/ti";
import { ImCross } from "react-icons/im";

const UpgradePage = () => {
  const[createCheckout, {isLoading}] = useCreateCheckoutMutation()
  const user = useSelector(state =>state.auth.user)
  const navigate = useNavigate()
  const handleUpgrade = async () =>{
    if(!user){
      navigate('/login')
      return
    }
    else{
      try{
        const res = await createCheckout().unwrap()
        window.location.href = res.url
      }
      catch(err){
        console.log(err)
      }
    }

  }

  return (
    <div className='min-h-screen bg-background pt-20 p-6'>
      <Navbar/>
      {isLoading && <Loader text='Preparing your upgrade'/>}
      <div className='text-center mb-10'>
        <h1 className='text-text text-3xl font-bold mb-1'>
          Upgrade to Pro
        </h1>
        <p className='text-yellow-600 text-2xl mb-5'>
          unlock the power of pennypilot
        </p>
        {user?.is_pro &&(
          <div className='text-center'>
            <p className='text-success text-xl'>You're already on Pro plan!</p>
           </div> 
        )}
        {!user?.is_pro &&(
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto'>

          {/* Free Plan */}
          <Card title='Free'>
            <p className='text-muted text-sm mb-4'>Current plan</p>
            <ul className='flex flex-col gap-2 mb-6'>
              <li className='text-text text-sm flex items-center gap-2'><TiTick className='text-green-500' /> Basic dashboard</li>
              <li className='text-text text-sm flex items-center gap-2'><TiTick className='text-green-500' /> 3 AI tips/month</li>
              <li className='text-text text-sm flex items-center gap-2'><TiTick className='text-green-500' /> 5 budgets max</li>
              <li className='text-muted text-sm flex items-center gap-2'><ImCross className='text-danger' /> Advanced analytics</li>
              <li className='text-muted text-sm flex items-center gap-2'><ImCross className='text-danger' /> Monthly reports</li>
              <li className='text-muted text-sm flex items-center gap-2'><ImCross className='text-danger' /> Unlimited AI</li>
            </ul>
            <p className='text-text text-2xl font-bold mb-4'>$0<span className='text-muted text-sm'>/month</span></p>
            <Button disabled className='w-full'>
              Current Plan
            </Button>
          </Card>

          {/* Pro Plan */}
          <Card title='Pro ⭐' className='border-primary'>
            <p className='text-primary text-sm mb-4'>Recommended</p>
            <ul className='flex flex-col gap-2 mb-6'>
              <li className='text-text text-sm flex items-center gap-2'><TiTick className='text-green-500' /> Everything in Free</li>
              <li className='text-text text-sm flex items-center gap-2'><TiTick className='text-green-500' /> Unlimited AI tips</li>
              <li className='text-text text-sm flex items-center gap-2'><TiTick className='text-green-500' /> Unlimited budgets</li>
              <li className='text-text text-sm flex items-center gap-2'><TiTick className='text-green-500' /> Advanced analytics</li>
              <li className='text-text text-sm flex items-center gap-2'><TiTick className='text-green-500' /> Monthly AI reports</li>
              <li className='text-text text-sm flex items-center gap-2'><TiTick className='text-green-500' /> 7 day free trial!</li>
            </ul>
            <p className='text-text text-2xl font-bold mb-4'>
              $9.99<span className='text-muted text-sm'>/month</span>
            </p>
            <Button
              onClick={handleUpgrade}
              disabled={isLoading}
              className='w-full'
            >
              {isLoading ? 'Loading...' : 'Upgrade Now '}
            </Button>
          </Card>

        </div>
        )}

      </div>
      

    </div>
  )
}

export default UpgradePage