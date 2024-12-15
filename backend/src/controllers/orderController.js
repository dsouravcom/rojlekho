const razorpay = require("razorpay");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");
const Order = require("../models/OrderModel");
const User = require("../models/UserModel");
const tokenCache = require("../config/cacheConfig");

const instance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const price = 500; // ₹5
const currency = "INR";
const receipt = uuidv4();

const createOneTimeOrder = async (req, res) => {
  try {
    const options = {
      amount: price,
      currency,
      receipt,
    };
    const order = await instance.orders.create(options);

    // Save order details to the database
    const { user } = req;
    const newOrder = new Order({
      user: user.id,
      orderId: order.id,
      receipt: order.receipt,
      amount: order.amount / 100,
    });
    await newOrder.save();
    res.status(200).json(order);
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).send({ error: "No token provided" });
    }

    // delete the user profile from cache
    tokenCache.del(token);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const createRecurringOrder = async (req, res) => {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).send({ error: "No token provided" });
    }

    // Add a small buffer to the current time to ensure start_at is in the future
    const startAt = Math.floor(Date.now() / 1000) + 60; // 1 minute from now

    // Create a subscription plan for the user
    const subscriptionOptions = {
      plan_id: process.env.RAZORPAY_PLAN_ID,
      total_count: 12,
      quantity: 1,
      customer_notify: 1,
      start_at: startAt, // Use startAt with a buffer
      addons: [],
      notes: {
        description: "Pro Plan",
      },
    };
    const subscription = await instance.subscriptions.create(
      subscriptionOptions
    );

    // Save order details to the database
    const { user } = req;
    const newOrder = new Order({
      user: user.id,
      subscriptionId: subscription.id,
      receipt: receipt,
      amount: 99, // ₹99
    });
    await newOrder.save();

    res.status(200).json(subscription);
    // delete the user profile from cache
    tokenCache.del(token);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// order validation and verification logic goes here
const verifyOneTimeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: "Invalid signature" });
    }

    // update the order with payment details
    const order = await Order.findOne({ orderId: razorpay_order_id });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    order.paymentId = razorpay_payment_id;
    order.paymentSignature = razorpay_signature;
    order.isSusses = true;
    await order.save();

    // update user subscription free to pro and premiumUser to true subscriptionStartDate and subscriptionExpirationDate to current date and 1 year from now
    const user = await User.findById(userId);
    user.subscription = "pro";
    user.premiumUser = true;
    user.subscriptionStartDate = new Date();
    await user.save();

    res.status(200).json({ message: "Payment verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// subscription validation and verification logic goes here
const verifyRecurringOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      razorpay_payment_id,
      razorpay_subscription_id,
      razorpay_signature,
    } = req.body;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_payment_id}|${razorpay_subscription_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: "Invalid signature" });
    }

    // Update the order with payment details
    const order = await Order.findOne({
      subscriptionId: razorpay_subscription_id,
      user: userId,
    });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    order.paymentId = razorpay_payment_id;
    order.paymentSignature = razorpay_signature;
    order.isSuccess = true;
    await order.save();

    // Update user subscription free to pro and premiumUser to true subscriptionStartDate and subscriptionExpirationDate to current date and 1 month from now
    const user = await User.findById(userId);
    user.subscription = "pro";
    user.premiumUser = true;
    user.subscriptionStartDate = new Date();
    // Calculate the subscription expiration date (one month later)
    const subscriptionExpirationDate = new Date();
    subscriptionExpirationDate.setMonth(
      subscriptionExpirationDate.getMonth() + 1
    );
    user.subscriptionExpirationDate = subscriptionExpirationDate;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Payment verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createRecurringOrder,
  verifyRecurringOrder,
  createOneTimeOrder,
  verifyOneTimeOrder,
};
