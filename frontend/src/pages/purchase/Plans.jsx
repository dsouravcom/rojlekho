import { Check, Coffee, Zap } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Footer from "../common/Footer";
import NavBar from "../common/NavBar";

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for trying out our service",
    features: ["All features", "Up to 5 entry per day"],
    icon: Coffee,
    emoji: "☕️",
    link: "/",
  },
  {
    name: "Pro",
    price: "One Time Payment / Per Month",
    description: "Support the Developers, and get more features",
    features: [
      "All Starter features",
      "Create Unlimited entries",
      "Priority support",
      "Future features",
    ],
    icon: Zap,
    emoji: "⚡️",
    popular: true,
    link: "/checkout",
  },
];

export default function PricingPlans() {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  return (
    <>
      <NavBar />
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Choose the plan that&apos;s right for you 🚀
            </p>
          </div>

          <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-2">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`flex flex-col justify-between rounded-lg shadow-sm overflow-hidden ${
                  plan.popular
                    ? "border-2 border-blue-500 shadow-lg"
                    : "border border-gray-200"
                }`}
              >
                <div className="p-6 bg-white">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {plan.name}
                    </h3>
                    {plan.icon && (
                      <plan.icon className="h-6 w-6 text-blue-500" />
                    )}
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    {plan.description}
                  </p>
                  <div className="mt-4 text-center">
                    <span className="text-4xl font-extrabold text-gray-900">
                      {plan.price}
                    </span>
                    {plan.price !== "Free"}
                  </div>
                  <ul className="mt-6 space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <div className="flex-shrink-0">
                          <Check className="h-6 w-6 text-green-500" />
                        </div>
                        <p className="ml-3 text-base text-gray-700">
                          {feature}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-6 py-4 bg-gray-50">
                  <button
                    disabled={user.premiumUser}
                    className={`w-full px-4 py-2 text-base font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                      plan.popular
                        ? "text-white bg-blue-600 hover:bg-blue-700"
                        : "text-blue-600 bg-white hover:bg-gray-50 border border-blue-600"
                    }`}
                    // onClick={handlePurchase}
                    onClick={() => navigate(plan.link)}
                  >
                    Get started {plan.emoji}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
