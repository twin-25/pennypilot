import React from 'react'
import { Link } from 'react-router-dom'
import AnimatedLogo from '../components/ui/AnimatedLogo'

const LandingPage = () => {
  return (
    <div className='min-h-screen bg-background'>
      <nav className="bg-surface fixed w-full z-20 top-0 inset-s-0 border-b border-border">
        <div className= "max-w-7xl flex items-center justify-between mx-auto p-4">
          <Link to='/login' className="flex items-center space-x-2">
          <span className="text-2xl"><img src="/penny-pilot-logo.svg" alt="Penny Pilot" width="48" height="48" /></span>
          <span className="text-xl text-primary font-bold">PennyPilot</span>
        </Link>

        <ul className="hidden md:flex items-center space-x-8">
          <li>
            <Link to='/login' className="text-muted hover:text-primary transition-colors">
              Login
            </Link>
          </li>
          <li>
            <Link to='/register' className="text-muted hover:text-primary transition-colors">
              Register
            </Link>
          </li>
        </ul>
        </div>
      </nav>


       <section className='flex flex-col items-center justify-center min-h-screen pt-20 text-center px-4 gap-3'>
        <AnimatedLogo/>
        <h1 className='text-text text-2xl mt-5'>Navigate Your Finances with AI 🤖</h1>
        <p className='text-muted text-xl'>Smart budgeting for everyone</p>
        <div className='flex flex-row gap-2'>
          <Link className='bg-primary text-white px-6 py-3 rounded-lg hover:opacity-90' to='/register'>Get Started Free</Link>

          <Link className='border border-border text-muted px-6 py-3 rounded-lg hover:text-text ' to='/login'>Login</Link>
        </div>

        <div className='flex gap-12 mt-16'>
    <div className='text-center'>
      <p className='text-text text-2xl font-bold'>100%</p>
      <p className='text-muted text-sm'>Free to start</p>
    </div>
    <div className='text-center'>
      <p className='text-text text-2xl font-bold'>AI</p>
      <p className='text-muted text-sm'>Powered insights</p>
    </div>
    <div className='text-center'>
      <p className='text-text text-2xl font-bold'>Real-time</p>
      <p className='text-muted text-sm'>Budget alerts</p>
    </div>
  </div>
      </section>
    </div>
  )
}

export default LandingPage