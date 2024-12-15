import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Rocket, ChevronRight, ArrowRight } from 'lucide-react'

export default function SuccessPage() {
    const navigate = useNavigate()
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    setShowConfetti(true)
    const timer = setTimeout(() => setShowConfetti(false), 60000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            >
              {['🎉', '🎊', '✨', '🌟'][Math.floor(Math.random() * 4)]}
            </div>
          ))}
        </div>
      )}
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <Sparkles className="mx-auto h-16 w-16 text-blue-600" />
          <h2 className="mt-6 text-4xl font-extrabold text-gray-900">
            Welcome to Pro! 🎉
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            You&apos;ve just unlocked a world of possibilities.
          </p>
        </div>
        
        <div className="bg-white shadow-xl rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center justify-center">
            <Rocket className="mr-2 h-6 w-6 text-blue-500" />
            Your Pro Journey Begins
          </h3>
          <ul className="space-y-2 text-left">
            {[
              "Unlimited access to all features 🚀",
              "Priority customer support 🌟",
              "Advanced analytics and insights 📊",
              "Exclusive Pro-only content 🔒"
            ].map((feature, index) => (
              <li key={index} className="flex items-start">
                <ChevronRight className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            Go to Dashboard
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
        
        <p className="text-sm text-gray-500">
          Need help getting started? <a href="mailto:help@rojlekho.com" className="font-medium text-blue-600 hover:text-blue-500 transition duration-150 ease-in-out">Contact our support team</a>
        </p>
      </div>
    </div>
  )
}