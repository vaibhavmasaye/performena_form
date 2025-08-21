// src/components/EditSelection.jsx
import { useState } from 'react'

const EditSelection = ({ values, onSaveEdit, onCancel, direction }) => {
  const [isExiting, setIsExiting] = useState(false)
  const [editedValues, setEditedValues] = useState(values)
  const [errors, setErrors] = useState({})
  const [activeField, setActiveField] = useState(null)
  const [shakingFields, setShakingFields] = useState({})

  const fields = [
    { 
      key: 'fullName', 
      label: 'Full Name', 
      type: 'text',
      placeholder: 'Enter your full name',
      validation: (value) => {
        if (!value.trim() || value.trim().length < 3) {
          return 'Please enter your full name (min 3 characters)'
        }
        return null
      }
    },
    { 
      key: 'phone', 
      label: 'Phone Number', 
      type: 'tel',
      placeholder: 'Enter your 10-digit phone number',
      validation: (value) => {
        const phoneRegex = /^[0-9]{10}$/
        if (!value.trim()) {
          return 'Please enter your phone number'
        }
        if (!phoneRegex.test(value)) {
          return 'Please enter a valid 10-digit phone number'
        }
        return null
      }
    },
    { 
      key: 'email', 
      label: 'Email Address', 
      type: 'email',
      placeholder: 'Enter your email address',
      validation: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!value.trim()) {
          return 'Please enter your email address'
        }
        if (!emailRegex.test(value)) {
          return 'Please enter a valid email address'
        }
        return null
      }
    },
    { 
      key: 'city', 
      label: 'City', 
      type: 'text',
      placeholder: 'Enter your city',
      validation: (value) => {
        if (!value.trim() || value.trim().length < 3) {
          return 'Please enter your city (min 3 characters)'
        }
        return null
      }
    },
    { 
      key: 'favoriteSport', 
      label: 'Favorite Sport', 
      type: 'text',
      placeholder: 'e.g., Football, Basketball, Cricket, etc.',
      validation: (value) => {
        if (!value.trim()) {
          return 'Please enter your favorite sport'
        }
        return null
      }
    },
    { 
      key: 'favoriteTeam', 
      label: 'Favorite Team', 
      type: 'text',
      placeholder: 'Enter your favorite team',
      validation: (value) => {
        if (!value.trim()) {
          return 'Please enter your favorite team'
        }
        return null
      }
    },
    { 
      key: 'favoriteSportsIcon', 
      label: 'Favorite Sports Icon', 
      type: 'text',
      placeholder: 'Enter your favorite sports icon',
      validation: (value) => {
        if (!value.trim()) {
          return 'Please enter your favorite sports icon'
        }
        return null
      }
    }
  ]

  const handleCancelClick = () => {
    setIsExiting(true)
    setTimeout(() => {
      onCancel()
    }, 300)
  }

  const handleSaveClick = () => {
    // Validate all fields
    const newErrors = {}
    const newShakingFields = {}
    let hasErrors = false
    
    fields.forEach(field => {
      const error = field.validation(editedValues[field.key])
      if (error) {
        newErrors[field.key] = error
        newShakingFields[field.key] = true
        hasErrors = true
      }
    })
    
    if (hasErrors) {
      setErrors(newErrors)
      setShakingFields(newShakingFields)
      
      // Clear the input values for fields with errors
      const clearedValues = { ...editedValues }
      Object.keys(newErrors).forEach(key => {
        clearedValues[key] = ''
      })
      setEditedValues(clearedValues)
      
      // Remove shake animation after 500ms
      setTimeout(() => {
        setShakingFields({})
      }, 500)
      
      return
    }
    
    setIsExiting(true)
    setTimeout(() => {
      onSaveEdit(editedValues)
    }, 300)
  }

  const handleFieldChange = (key, value) => {
    setEditedValues(prev => ({ ...prev, [key]: value }))
    
    // Clear error when user starts typing
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: null }))
    }
  }

  const handleFieldFocus = (key) => {
    setActiveField(key)
  }

  const handleFieldBlur = (key) => {
    // Validate field on blur
    const field = fields.find(f => f.key === key)
    if (field) {
      const error = field.validation(editedValues[key])
      if (error) {
        setErrors(prev => ({ ...prev, [key]: error }))
        setShakingFields(prev => ({ ...prev, [key]: true }))
        
        // Clear the input value for this field
        setEditedValues(prev => ({ ...prev, [key]: '' }))
        
        // Remove shake animation after 500ms
        setTimeout(() => {
          setShakingFields(prev => ({ ...prev, [key]: false }))
        }, 500)
      } else {
        setErrors(prev => ({ ...prev, [key]: null }))
        setShakingFields(prev => ({ ...prev, [key]: false }))
      }
    }
    setActiveField(null)
  }

  return (
    <div className={`w-full transition-all duration-500 ${isExiting ? 'opacity-0 -translate-y-10' : direction === 'forward' ? 'animate-slide-in' : 'animate-slide-in-reverse'}`}>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Edit Information</h2>
      <p className="text-gray-600 mb-6 text-center">Edit your information directly below:</p>
      
      <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left shadow-sm max-h-96 overflow-y-auto">
        <div className="space-y-4">
          {fields.map(({ key, label, type, placeholder }) => (
            <div key={key} className="py-3 border-b border-gray-200 last:border-b-0">
              <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-2">
                {label}
              </label>
              <input
                type={type}
                id={key}
                className={`w-full px-4 py-3 border ${errors[key] ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${
                  shakingFields[key] ? 'animate-shake' : ''
                }`}
                placeholder={placeholder}
                value={editedValues[key]}
                onChange={(e) => handleFieldChange(key, e.target.value)}
                onFocus={() => handleFieldFocus(key)}
                onBlur={() => handleFieldBlur(key)}
                autoFocus={activeField === key}
              />
              {errors[key] && <p className="mt-2 text-sm text-red-600">{errors[key]}</p>}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex space-x-4">
        <button
          onClick={handleCancelClick}
          className="w-1/2 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSaveClick}
          className="w-1/2 bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  )
}

export default EditSelection