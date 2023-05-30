import express from "express"
const Userrouter = express.Router()
import User from "../models/User"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { vali, valiToken, valiTokenAdmin } from "./verifytoken"


Userrouter.put("/update/:id", valiToken, async (req, res) => {
    try {
        const { username, email, } = req.body

        const update = await User.updateOne({ _id: req.params.id }, { $set: { username, email } })



        if (update) {
            return res.status(201).json({
                user: update,
                message: "Updated"
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
Userrouter.delete("/delete/:id", valiToken, async (req, res) => {
    try {
        const del = await User.deleteOne({ _id: req.params.id })


        if (del) {
            return res.status(201).json({
                user: del,
                message: " Deleted"
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
//get users

Userrouter.get("/user/:id", valiToken, async (req, res) => {
    try {
        const data = await User.findOne({ _id: req.params.id })


        if (data) {
            return res.status(200).json({
                user: data,
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
Userrouter.get("/admin", valiTokenAdmin, (req, res) => {
    return res.status(200).json({
        message: "accessed"
    })
})


Userrouter.get("/users", valiTokenAdmin, async (req, res) => {
    try {
        const data = await User.find({ isAdmin: false })


        if (data) {
            return res.status(200).json({
                user: data,
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
Userrouter.get("/logout", (req, res) => {
    try {
        console.log(req.cookies)

        res.clearCookie('access_token', { sameSite: "none", secure: true }).json({
            message: "logged out"
        })
        res.end()





    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
})
Userrouter.get("/verify", vali, (req, res) => {
    try {
        return res.status(200).json({
            user: req.user,
            status: "logged in"
        })


    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
})

// get user stats

Userrouter.get("/users/stats", valiTokenAdmin, async (req, res) => {
    try {
        const date = new Date()
        console.log(date)
        const lastyear = new Date(date.setFullYear(date.getFullYear() - 1))
        console.log(lastyear)
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastyear } } },
            {
                $project: {
                    month: { $month: "$createdAt" }
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                }
            }
        ])
        res.status(200).json(data)



    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})








export default Userrouter

