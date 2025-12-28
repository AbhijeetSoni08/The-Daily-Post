import React from 'react'
import {LoginForm} from '../components/LoginForm'


function Login() {
  return (
    <div className="py-8 w-full bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg mx-auto">
        <LoginForm />
      </div>
    </div>
  )
}

export default Login