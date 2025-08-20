// src/components/Step7.jsx
import { useState } from 'react'

const Step7 = ({ nextStep, handleChange, values, direction }) => {
  const [error, setError] = useState('')
  const [isShaking, setIsShaking] = useState(false)

  const continueStep = (e) => {
    e.preventDefault()
    
    if (!values.favoriteSportsIcon.trim()) {
      setError('Please enter your favorite sports icon')
      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 500)
      return
    }
    
    setError('')
    nextStep()
  }

  return (
    <div className={`w-full transition-all duration-500 ${direction === 'forward' ? 'animate-slide-in' : 'animate-slide-in-reverse'}`}>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sports Icon</h2>
      <div className="mb-6">
        <label htmlFor="favoriteSportsIcon" className="block text-sm font-medium text-gray-700 mb-2">
          Favorite Sports Icon
        </label>
        <input
          type="text"
          id="favoriteSportsIcon"
          className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${
            isShaking ? 'animate-shake' : ''
          }`}
          placeholder="Enter your favorite sports icon"
          value={values.favoriteSportsIcon}
          onChange={handleChange('favoriteSportsIcon')}
          autoFocus
        />
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
      <div className="flex space-x-4">
        <button
          onClick={continueStep}
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition shadow-md hover:shadow-lg"
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default Step7