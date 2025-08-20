import { useState } from 'react'

const Step5 = ({ nextStep, handleChange, values }) => {
  const [error, setError] = useState('')
  const [isShaking, setIsShaking] = useState(false)

  const continueStep = (e) => {
    e.preventDefault()
    
    if (!values.favoriteSport.trim()) {
      setError('Please enter your favorite sport')
      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 500)
      return
    }
    
    setError('')
    nextStep()
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sports Preferences</h2>
      <div className="mb-6">
        <label htmlFor="favoriteSport" className="block text-sm font-medium text-gray-700 mb-2">
          Favorite Sport
        </label>
        <input
          type="text"
          id="favoriteSport"
          className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${
            isShaking ? 'animate-shake' : ''
          }`}
          placeholder="e.g., Football, Basketball, Cricket, etc."
          value={values.favoriteSport}
          onChange={handleChange('favoriteSport')}
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

export default Step5