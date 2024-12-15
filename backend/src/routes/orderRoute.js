const {
  createRecurringOrder,
  verifyRecurringOrder,
  createOneTimeOrder,
  verifyOneTimeOrder,
} = require("../controllers/orderController");
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

router.post("/recurring-order", auth, createRecurringOrder);
router.post("/recurring-order/verify", auth, verifyRecurringOrder);
router.post("/onetime-order", auth, createOneTimeOrder);
router.post("/onetime-order/verify", auth, verifyOneTimeOrder);

module.exports = router;
