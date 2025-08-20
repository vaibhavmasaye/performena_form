// src/components/FormField.jsx
import { useState } from 'react'

const FormField = ({ field, value, onComplete, isLastField }) => {
  const [inputValue, setInputValue] = useState(value || '')
  const [error, setError] = useState('')
  const [isShaking, setIsShaking] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const validationResult = field.validation(inputValue)
    if (validationResult !== true) {
      setError(validationResult)
      setIsShaking(true)
      setTimeout(() => {
        setIsShaking(false)
        setInputValue('') // Clear the input on error as required
      }, 500)
      return
    }
    
    setError('')
    setIsAnimating(true)
    
    // Wait for animation to complete before calling onComplete
    setTimeout(() => {
      onComplete(inputValue)
      setIsAnimating(false)
    }, 300)
  }

  return (
    <div className={`w-full transition-all duration-300 ${isAnimating ? 'transform -translate-y-10 opacity-0' : 'opacity-100'}`}>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">{field.label}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor={field.key} className="block text-sm font-medium text-gray-700 mb-2">
            {field.label}
          </label>
          <input
            type={field.type}
            id={field.key}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${
              isShaking ? 'animate-shake border-red-500' : ''
            }`}
            placeholder={field.placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            autoFocus
          />
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
        
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition shadow-md hover:shadow-lg"
        >
          {isLastField ? 'Submit' : 'Continue'}
        </button>
      </form>
    </div>
  )
}

export default FormField