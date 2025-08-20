// src/components/Step3.jsx
import { useState } from 'react'

const Step3 = ({ nextStep, handleChange, values, direction }) => {
  const [error, setError] = useState('')
  const [isShaking, setIsShaking] = useState(false)

  const continueStep = (e) => {
    e.preventDefault()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    if (!values.email.trim()) {
      setError('Please enter your email address')
      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 500)
      return
    }
    
    if (!emailRegex.test(values.email)) {
      setError('Please enter a valid email address')
      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 500)
      return
    }
    
    setError('')
    nextStep()
  }

  return (
    <div className={`w-full transition-all duration-500 ${direction === 'forward' ? 'animate-slide-in' : 'animate-slide-in-reverse'}`}>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Email Address</h2>
      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${
            isShaking ? 'animate-shake' : ''
          }`}
          placeholder="Enter your email address"
          value={values.email}
          onChange={handleChange('email')}
          autoFocus
        />
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
      <div className="flex space-x-4">
        <button
          onClick={continueStep}
         className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition shadow-md hover:shadow-lg"
        >
          Continue
        </button>
      </div>
    </div>
  )
}

export default Step3