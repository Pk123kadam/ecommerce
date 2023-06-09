import multer from "multer";
import fs from "fs"

export const product_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (fs.existsSync('product_images')) {
            cb(null, 'product_images')

        }
        else {
            fs.mkdirSync('product_images')
            cb(null, 'product_images')
        }
    },
    filename: function (req, file, cb) {
        console.log(file)
        const name = file.originalname
        console.log(name)

        const arr = name.split(".")
        const ext = arr[arr.length - 1]
        arr.pop()

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, arr.join(".") + '-' + uniqueSuffix + "." + ext)

    }
})
export const user_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (fs.existsSync('user_images')) {
            cb(null, 'user_images')

        }
        else {
            fs.mkdirSync('user_images')
            cb(null, 'user_images')
        }
    },
    filename: function (req, file, cb) {
        console.log(file)
        const name = file.originalname
        console.log(name)

        const arr = name.split(".")
        const ext = arr[arr.length - 1]
        arr.pop()

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, arr.join(".") + '-' + uniqueSuffix + "." + ext)

    }
})