// src/components/Step1.jsx
import { useState } from 'react'

const Step1 = ({ nextStep, handleChange, values, animationDirection }) => {
  const [error, setError] = useState('')
  const [isShaking, setIsShaking] = useState(false)

  const continueStep = (e) => {
    e.preventDefault()
    if (!values.fullName.trim() || values.fullName.trim().length < 3) {
      setError('Please enter your full name (min 3 characters)')
      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 500)
      return
    }
    setError('')
    nextStep()
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Personal Information</h2>
      <div className="mb-6">
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${
            isShaking ? 'animate-shake' : ''
          }`}
          placeholder="Enter your full name"
          value={values.fullName}
          onChange={handleChange('fullName')}
          autoFocus
        />
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
      <button
        onClick={continueStep}
        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition shadow-md hover:shadow-lg"
      >
        Continue
      </button>
    </div>
  )
}

export default Step1