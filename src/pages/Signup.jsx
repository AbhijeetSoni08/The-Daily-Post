import React from 'react'
import { Signup as SignupComponent } from '../components/index.js'

function Signup() {
  return (
    <div className="py-8 w-full bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg mx-auto">
        <SignupComponent />
      </div>
    </div>
  )
}

export default Signup