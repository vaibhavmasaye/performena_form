// src/components/ReviewStep.jsx
import { useState } from 'react'

const ReviewStep = ({ values, onEdit, onReset, direction }) => {
  const [isExiting, setIsExiting] = useState(false)

  const handleEditClick = () => {
    setIsExiting(true)
    setTimeout(() => {
      onEdit()
    }, 300)
  }

  const handleResetClick = () => {
    setIsExiting(true)
    setTimeout(() => {
      onReset()
    }, 300)
  }

  return (
    <div className={`w-full text-center transition-all duration-500 ${isExiting ? 'opacity-0 -translate-y-10' : direction === 'forward' ? 'animate-slide-in' : 'animate-slide-in-reverse'}`}>
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Complete!</h2>
      <p className="text-gray-600 mb-6">Your information has been submitted successfully.</p>
      
      <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left shadow-sm">
        <h3 className="font-medium text-gray-700 mb-4 text-lg border-b pb-2">Your Information:</h3>
        <div className="space-y-3">
          {Object.entries(values).map(([key, value]) => (
            <p key={key}>
              <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span> {value || 'Not provided'}
            </p>
          ))}
        </div>
      </div>
      
      <div className="flex space-x-4">
        <button
          onClick={handleEditClick}
          className="w-1/2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        >
          Edit
        </button>
        <button
          onClick={handleResetClick}
          className="w-1/2 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
        >
          New Registration
        </button>
      </div>
    </div>
  )
}

export default ReviewStep