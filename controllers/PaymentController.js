// controllers/paymentController.js

const Payment = require('../models/PaymentModal'); // Corrected model import
const Razorpay = require('razorpay');
const shortid = require('shortid');

const razorpay = new Razorpay({
  key_id: 'rzp_test_knOVu1NYKsdaZl',
  key_secret: 'Egnk7dvvzPJg1a2NVdNz3EAT'
});

exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: shortid.generate()
    };

    const order = await razorpay.orders.create(options);

    const newPayment = new Payment({
      orderId: order.id,
      amount: amount
    });

    await newPayment.save();

    res.json({ orderId: order.id });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { orderId, paymentId, signature } = req.body;

    const payment = await Payment.findOne({ orderId });

    if (!payment) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const expectedSignature = razorpay.webhooks.generateSignature(JSON.stringify(req.body), process.env.RAZORPAY_WEBHOOK_SECRET);

    if (signature !== expectedSignature) {
      return res.status(400).json({ message: 'Invalid signature' });
    }

    payment.status = 'completed';
    await payment.save();

    res.json({ message: 'Payment verified successfully' });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
