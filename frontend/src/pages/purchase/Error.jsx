import { XCircle, AlertTriangle, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Error() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <XCircle className="mx-auto h-12 w-12 text-red-500" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Payment Canceled 😕
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Oops! It looks like your payment was canceled.
            </p>
          </div>

          <div className="mt-8">
            <div className="rounded-md bg-yellow-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    No charges were made
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      Your account has not been charged. If you experienced any issues during the payment process, please try again or contact our support team.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/plans"
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Plans
              </Link>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Need help?
                  </span>
                </div>
              </div>

              <div className="mt-6 ">
                <div>
                  <a
                    href="mailto:help@rojlekho.com"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    Contact Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
