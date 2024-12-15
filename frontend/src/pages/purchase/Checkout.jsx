import { Calendar, CreditCard, Heart } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import UserContext from "../../context/UserContext";

export default function Checkout() {
  const [selectedOption, setSelectedOption] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const initializeRazorpay = () => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";

        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          resolve(false);
        };

        document.body.appendChild(script);
      });
    };

    const res = initializeRazorpay();
    if (!res) {
      console.error("Failed to load Razorpay SDK");
      alert("Please check your internet connection and try again.");
    }
  }, []);

  const navigate = useNavigate();

  // handle one-time payment
  const handleOneTimePayment = async () => {
    await api
      .post("/order/onetime-order")
      .then((response) => {
        const { data } = response;
        const options = {
          key: import.meta.env.REACT_APP_RAZORPAY_KEY_ID,
          amount: data.amount,
          currency: data.currency,
          name: "Roj Lekho",
          description: "Pro Plan",
          image:
            "https://res.cloudinary.com/dzjujoqyi/image/upload/v1734201418/rojlekho-logo.png",
          order_id: data.id,
          handler: async function (response) {
            const {
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
            } = response;
            await api
              .post("/order/onetime-order/verify", {
                razorpay_payment_id,
                razorpay_order_id,
                razorpay_signature,
              })
              .then((response) => {
                console.log(response);
                navigate("/success");
              })
              .catch((error) => {
                console.log(error);
                navigate("/error");
              });
          },
          prefill: {
            name: user.name,
            email: user.email,
          },
          theme: {
            color: "#3399cc",
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // handle recurring payment
  const handleRecurringPayment = async () => {
    await api
      .post("/order/recurring-order")
      .then((response) => {
        const { data } = response;
        const options = {
          key: import.meta.env.REACT_APP_RAZORPAY_KEY_ID,
          subscription_id: data.id,
          name: "Roj Lekho",
          description: "Pro Plan",
          image:
            "https://res.cloudinary.com/dzjujoqyi/image/upload/v1734201418/rojlekho-logo.png",
          handler: async function (response) {
            const {
              razorpay_payment_id,
              razorpay_subscription_id,
              razorpay_signature,
            } = response;
            await api
              .post("/order/recurring-order/verify", {
                razorpay_payment_id,
                razorpay_subscription_id,
                razorpay_signature,
              })
              .then((response) => {
                console.log(response);
                navigate("/success");
              })
              .catch((error) => {
                console.log(error);
                navigate("/error");
              });
          },
          prefill: {
            name: user.name,
            email: user.email,
          },
          theme: {
            color: "#3399cc",
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePayment = () => {
    if (selectedOption === "onetime") {
      handleOneTimePayment();
    } else if (selectedOption === "recurring") {
      handleRecurringPayment();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Support a Developer 👨‍💻
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Your contribution helps fuel late-night coding sessions ☕️
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center justify-center mb-6">
              <Heart className="h-12 w-12 text-red-500 animate-pulse" />
            </div>
            <div className="space-y-4">
              <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50">
                <input
                  type="radio"
                  value="onetime"
                  checked={selectedOption === "onetime"}
                  onChange={() => setSelectedOption("onetime")}
                  className="form-radio h-5 w-5 text-indigo-600"
                />
                <div className="flex flex-col">
                  <span className="text-gray-900 font-medium">
                    One-time Support 🎉
                  </span>
                  <span className="text-gray-500 text-sm">
                    A single boost of motivation
                  </span>
                </div>
                <div className="flex gap-4 items-center space-x-2 text-gray-900 font-medium">
                  <CreditCard className="h-6 w-6 text-indigo-500 ml-auto" />
                  ₹5
                </div>
              </label>
              <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50">
                <input
                  type="radio"
                  value="recurring"
                  checked={selectedOption === "recurring"}
                  onChange={() => setSelectedOption("recurring")}
                  className="form-radio h-5 w-5 text-indigo-600"
                />
                <div className="flex flex-col">
                  <span className="text-gray-900 font-medium">
                    Monthly Support 🚀
                  </span>
                  <span className="text-gray-500 text-sm">
                    Fuel ongoing development
                  </span>
                </div>
                <div className="flex gap-4 items-center space-x-2 text-gray-900 font-medium">
                  <Calendar className="h-6 w-6 text-indigo-500 ml-auto" />
                  ₹5/month
                </div>
              </label>
            </div>
            <button
              onClick={handlePayment}
              disabled={!selectedOption}
              className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Proceed to Payment 💖
            </button>
          </div>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Your support means the world! It helps me create more awesome stuff
            for you. 🌟
          </p>
        </div>
      </div>
    </div>
  );
}
