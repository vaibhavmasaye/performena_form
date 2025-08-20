// src/App.jsx
import { useState, useEffect } from 'react'
import ProgressBar from './components/ProgressBar'
import Step1 from './components/Step1'
import Step2 from './components/Step2'
import Step3 from './components/Step3'
import Step4 from './components/Step4'
import Step5 from './components/Step5'
import Step6 from './components/Step6'
import Step7 from './components/Step7'
import ReviewStep from './components/ReviewStep'

function App() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    favoriteSport: '',
    favoriteTeam: '',
    favoriteSportsIcon: ''
  })
  const [isEditing, setIsEditing] = useState(false)

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedData = localStorage.getItem('multiStepFormData')
    if (savedData) {
      setFormData(JSON.parse(savedData))
    }
  }, [])

  // Save data to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem('multiStepFormData', JSON.stringify(formData))
  }, [formData])

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value })
  }

  const resetForm = () => {
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      city: '',
      favoriteSport: '',
      favoriteTeam: '',
      favoriteSportsIcon: ''
    })
    setStep(1)
    setIsEditing(false)
    localStorage.removeItem('multiStepFormData')
  }

  const handleEdit = () => {
    setIsEditing(true)
    setStep(1)
  }

  const handleSave = () => {
    setIsEditing(false)
    setStep(8) // Go back to review step
  }

  const renderStep = () => {
    const commonProps = {
      nextStep,
      prevStep,
      handleChange,
      values: formData
    }

    switch (step) {
      case 1:
        return <Step1 {...commonProps} />
      case 2:
        return <Step2 {...commonProps} />
      case 3:
        return <Step3 {...commonProps} />
      case 4:
        return <Step4 {...commonProps} />
      case 5:
        return <Step5 {...commonProps} />
      case 6:
        return <Step6 {...commonProps} />
      case 7:
        return <Step7 {...commonProps} />
      case 8:
        return <ReviewStep 
          values={formData} 
          onEdit={handleEdit}
          onSave={handleSave}
          onReset={resetForm}
          isEditing={isEditing}
        />
      default:
        return <Step1 {...commonProps} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <ProgressBar step={step} />
        <div className="px-6 py-8 min-h-[400px] flex items-center justify-center">
          {renderStep()}
        </div>
      </div>
    </div>
  )
}

export default App