import express from "express"
const Cartrouter = express.Router()
import Cart from "../models/Cart"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { valiToken, valiTokenAdmin, vali } from "./verifytoken"


Cartrouter.post("/addCart", vali, async (req, res) => {
    try {
        const add = new Cart({
            ...req.body

        })
        const save = add.save()




        if (save) {
            return res.status(201).json({
                user: add,
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

Cartrouter.put("/updateCart/:id", valiToken, async (req, res) => {
    try {
        const { message, data } = req.body
        let update;
        console.log(message, data)
        if (message == "increment") {
            update = await Cart.updateOne({ _id: req.params.id }, { $inc: { quantity: +1, price: +data.price } })


        }
        else if (message == "decrement") {
            update = await Cart.updateOne({ _id: req.params.id }, { $inc: { quantity: -1, price: -data.price } })


        }




        if (update) {
            return res.status(201).json({
                cart: update,
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
Cartrouter.delete("/cartDelete/:id", vali, async (req, res) => {
    try {
        const del = await Cart.deleteOne({ _id: req.params.id })


        if (del) {
            return res.status(201).json({
                user: del,
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
//get cart

Cartrouter.get("/cart/:id", vali, async (req, res) => {
    try {
        const data = await Cart.find({ userID: req.params.id })
        console.log(data)


        if (data) {
            return res.status(200).json({
                cart: data,
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

//get all users


Cartrouter.get("/products", valiTokenAdmin, async (req, res) => {
    try {

        const data = await Cart.find({

        })


        if (data) {
            return res.status(200).json({
                carts: data,
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








export default Cartrouter

