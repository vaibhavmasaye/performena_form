// src/components/ProgressBar.jsx
const ProgressBar = ({ step }) => {
  const steps = [
    { number: 1, label: "Name" },
    { number: 2, label: "Phone" },
    { number: 3, label: "Email" },
    { number: 4, label: "City" },
    { number: 5, label: "Sport" },
    { number: 6, label: "Team" },
    { number: 7, label: "Icon" },
    { number: 8, label: "Review" }
  ]

  return (
    <div className="px-6 pt-6">
      <div className="flex items-center justify-between mb-4">
        {steps.map(({ number, label }) => (
          <div key={number} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                number <= step ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}
            >
              {number}
            </div>
            <div className="text-xs mt-1 text-gray-500 hidden sm:block">{label}</div>
          </div>
        ))}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${(step - 1) * 14.28}%` }}
        ></div>
      </div>
    </div>
  )
}

export default ProgressBar