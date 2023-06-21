import express from 'express';
const orderRoute = express.Router();

import orderModel from '../models/Order';

// IMPORTING STRIPE AND SECRET KEY----------
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51KtVxhSAIlAmsg9ER2usF0pyzuLnlfKvPkdDLN1melVKcWAqbfgmF0qqmU3X0oMs5Sv9SnoHt2LhJu3x43JYyudQ00yIyjAl6r');

import { v4 as uuidv4 } from 'uuid';


orderRoute.post('/placeOrder', async (req, res) => {

    const { token, grandTotal, currentUser, cartItems } = req.body;

    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })
        console.log(customer);

        const payment = await stripe.paymentIntents.create({
            customer: customer.id,
            amount: grandTotal * 100,
            currency: 'INR',
            receipt_email: token.email,
            payment_method_types: ['card'],
        }, {
            idempotencyKey: uuidv4()
        })
        console.log(payment);

        if (payment) {
            const newOrder = new orderModel({
                name: currentUser.username,
                email: currentUser.email,
                userId: currentUser._id,
                orderItems: cartItems,
                shippingAddress: {
                    street: token.card.address_line_1,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    pincode: token.card.address_zip
                },
                orderAmount: grandTotal,
                transactionId: payment.id
            })
            newOrder.save();
            console.log(newOrder);


            res.status(200).json({
                data: payment,
                message: "payment successfull"
            })
        } else {
            res.status(400).json({
                message: 'Something went wrong. Please retry again.'
            })
        }

    } catch (error) {
        return res.status(400).json({
            message: 'Something went wrong. Please retry again.' + error
        })
    }
})






orderRoute.get('/get-all-orders', async (req, res) => {

    try {
        const orders = await orderModel.find()
        res.send(orders);
    } catch (error) {
        return res.status(400).json({
            message: 'something went wrong' + error
        })
    }

})

orderRoute.post('/get-user-orders', async (req, res) => {
    const { userId } = req.body;

    try {
        const orders = await orderModel.find({ userId: userId }).sort({ _id: -1 })
        res.send(orders);
    } catch (error) {
        return res.status(400).json({
            message: 'something went wrong' + error
        })
    }

})


orderRoute.post('/deliver-order', async (req, res) => {

    const orderId = req.body.orderId;
    try {
        const order = await orderModel.findOne({ _id: orderId })
        order.isDelivered = true
        await order.save()
        res.send("Order delivered successfully");
    } catch (error) {
        return res.status(400).json({
            message: 'something went wrong' + error
        })
    }

})


export default orderRoute;