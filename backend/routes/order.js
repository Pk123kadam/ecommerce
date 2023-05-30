import express from "express"
const Orderrouter = express.Router()
import Order from "../models/Order"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { valiToken, valiTokenAdmin } from "./verifytoken"


Orderrouter.post("/addOrder", valiToken, async (req, res) => {
    try {
        const add = new Order({
            ...req.body

        })
        const save = add.save()




        if (save) {
            return res.status(201).json({
                order: add,
                message: "successfully updated"
            })
        } else {
            return res.status(400).json({
                message: "something went wrong"
            })
        }


    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

Orderrouter.patch("/updateOrder/:id", valiTokenAdmin, async (req, res) => {
    try {


        const update = await Order.updateOne({ _id: req.params.id }, { $set: { ...req.body } })



        if (update) {
            return res.status(201).json({
                order: update,
                message: "successfully updated"
            })
        } else {
            return res.status(400).json({
                message: "something went wrong"
            })
        }


    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})
Orderrouter.delete("/OrderDelete/:id", valiTokenAdmin, async (req, res) => {
    try {
        const del = await Order.deleteOne({ _id: req.params.id })


        if (del) {
            return res.status(201).json({
                order: update,
                message: "successfully deleted"
            })
        } else {
            return res.status(400).json({
                message: "something went wrong"
            })
        }


    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})
//get order

Orderrouter.get("/Order/:id", valiToken, async (req, res) => {
    try {
        const data = await Order.findOne({ _id: req.params.id })


        if (data) {
            return res.status(200).json({
                order: data,
                message: "successfully fetched"
            })
        } else {
            return res.status(400).json({
                message: "something went wrong"
            })
        }


    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

//get all order


Orderrouter.get("/orders", valiTokenAdmin, async (req, res) => {
    try {

        const data = await Order.find({

        })


        if (data) {
            return res.status(200).json({
                order: data,
                message: "successfully fetched"
            })
        } else {
            return res.status(400).json({
                message: "something went wrong"
            })
        }


    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

// get user stats

// Cartrouter.get("/users/stats", valiTokenAdmin, async (req, res) => {
//     try {
//         const date = new Date()
//         console.log(date)
//         const lastyear = new Date(date.setFullYear(date.getFullYear() - 1))
//         console.log(lastyear)
//         const data = await User.aggregate([
//             { $match: { createdAt: { $gte: lastyear } } },
//             {
//                 $project: {
//                     month: { $month: "$createdAt" }
//                 },
//             },
//             {
//                 $group: {
//                     _id: "$month",
//                     total: { $sum: 1 }
//                 }
//             }
//         ])
//         res.status(200).json(data)



//     } catch (err) {
//         res.status(500).json({
//             message: err.message
//         })
//     }
// })








export default Orderrouter

