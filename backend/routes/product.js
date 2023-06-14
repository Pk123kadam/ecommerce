import express from "express"
const Productrouter = express.Router()
import Product from "../models/Product"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { valiToken, valiTokenAdmin } from "./verifytoken"
import { product_storage } from "../multer/multer"
import multer from "multer"
import fs from "fs"


Productrouter.post("/addProduct", valiTokenAdmin, async (req, res) => {
    try {
        const upload = multer({ storage: product_storage })
        const uploadData = upload.single("image")

        uploadData(req, res, async function (err) {
            if (err) {
                return res.status(400).json({
                    message: err.message
                })
            }

            console.log(req.file.filename)
            const Image = req.file.filename
            const { name, description, category, small, large, array } = req.body

            console.log(array)


            const add = new Product({
                image: Image, name, description, category, prices: {
                    small,
                    large
                },
                variants: array
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



        })


    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

Productrouter.put("/updateProduct/:id", valiTokenAdmin, async (req, res) => {

    try {
        const upload = multer({ storage: product_storage })
        const uploadData = upload.single("image")

        uploadData(req, res, async function (err) {
            if (err) {
                return res.status(400).json({
                    message: err.message
                })
            }
            const { name, description, category, small, large, array } = req.body
            const prev_data = await Product.findOne({ _id: req.params.id })
            let img;
            if (req.file) {
                img = req.file.filename
                fs.unlink(`product_images/${prev_data.image}`, async (err) => {
                    if (err) {
                        return res.status(400).json({ message: err })
                    }
                    console.log('deleted')
                })
            }



            const upd = await Product.updateOne({ _id: req.params.id }, {
                $set: {
                    image: img, name, description, category, prices: {
                        small,
                        large
                    },
                    variants: array



                }
            })





            if (upd) {
                return res.status(201).json({
                    user: upd,
                    message: "successfully updated"
                })
            } else {
                return res.status(400).json({
                    message: "something went wrong"
                })
            }



        })


    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})
Productrouter.delete("/productDelete/:id", valiTokenAdmin, async (req, res) => {
    try {
        const data = await Product.findOne({ _id: req.params.id })


        fs.unlink(`product_images/${data.image}`, async (err) => {
            if (err) {
                return res.status(400).json({ message: err })
            }
            console.log('deleted')
        })

        const del = await Product.deleteOne({ _id: req.params.id })


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
//get users

Productrouter.get("/product/:id", async (req, res) => {
    try {
        const data = await Product.findOne({ _id: req.params.id })


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


Productrouter.get("/products", async (req, res) => {
    try {
        const { category } = req.query

        const data = await Product.find()


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

// get user stats

Productrouter.get("/users/stats", valiTokenAdmin, async (req, res) => {
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








export default Productrouter

