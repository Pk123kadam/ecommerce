import express from "express"
const router = express.Router()
import User from "../models/User"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import vali from "./verifytoken"
import multer from "multer"
import { user_storage } from "../multer/multer"
//register

router.post("/register", (req, res) => {
    try {
        const upload = multer({ storage: user_storage })
        const uploadData = upload.single("image")

        uploadData(req, res, async function (err) {
            if (err) {
                return res.status(400).json({
                    message: err.message
                })
            }
            console.log(req.file.filename)
            const img = req.file.filename
            console.log(req.body)

            const { username, email, password, isAdmin } = req.body
            const hash = bcrypt.hashSync(password, 10)
            const add = new User({
                username, email, password: hash, image: img

            })
            const save = await add.save()
            if (save) {
                return res.status(201).json({
                    user: add,
                    message: "Registered"
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


//LOGIN
router.post("/login", async (req, res) => {
    try {
        const {
            username, password
        } = req.body
        const user_data = await User.findOne({ username: username })

        if (user_data) {
            const pass = bcrypt.compareSync(password, user_data.password)
            console.log(pass)
            if (pass) {
                const token = jwt.sign({ user_data }, process.env.SECRET_KEY)
                return res.cookie("access_token", token, { sameSite: "none", secure: true }).status(200).json({
                    message: "logged in",
                    data: user_data
                })

            } else {
                return res.status(400).json({
                    message: "invalid credentials"
                })
            }
        } else {
            return res.status(400).json({
                message: "user not found"
            })
        }
    } catch (err) {
        return res.json({
            message: err.message
        })
    }
})



export default router

