// src/components/Step4.jsx
import { useState } from 'react'

const Step4 = ({ nextStep, handleChange, values, direction }) => {
  const [error, setError] = useState('')
  const [isShaking, setIsShaking] = useState(false)
  const [localValue, setLocalValue] = useState(values.city)

  const continueStep = (e) => {
    e.preventDefault()
    
    if (!localValue.trim() || localValue.trim().length < 3) {
      setError('Please enter your city (min 3 characters)')
      setIsShaking(true)
      setLocalValue('') // Clear the input
      setTimeout(() => setIsShaking(false), 500)
      return
    }
    
    setError('')
    handleChange('city')({ target: { value: localValue } })
    nextStep()
  }

  const handleInputChange = (e) => {
    setLocalValue(e.target.value)
    // Clear error when user starts typing
    if (error) {
      setError('')
    }
  }

  return (
    <div className={`w-full transition-all duration-500 ${direction === 'forward' ? 'animate-slide-in' : 'animate-slide-in-reverse'}`}>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Location Information</h2>
      <div className="mb-6">
        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
          City
        </label>
        <input
          type="text"
          id="city"
          className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${
            isShaking ? 'animate-shake' : ''
          }`}
          placeholder="Enter your city"
          value={localValue}
          onChange={handleInputChange}
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

export default Step4