import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../api/api";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = searchParams.get("token");
        if (!token) {
          setMessage("Invalid token");
          return;
        }

        await api.post(`/auth/verify-email/${token}`);
        setMessage("Email verified successfully. Redirecting to login page...");
        // Redirect to login page after 5 seconds
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      } catch (error) {
        setMessage("Verification failed. Please try again.");
      }
    };

    verifyToken();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Verify Your Email
        </h2>
        {message && (
          <div
            className={`p-3 rounded mb-4 ${
              message.startsWith("Email verified")
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message}
          </div>
        )}
        {!message && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-2">Verifying...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
