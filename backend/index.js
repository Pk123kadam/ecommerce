import express from "express"
import * as dotenv from "dotenv"

dotenv.config()

import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import cors from "cors"
import router from "./routes/auth"
import Userrouter from "./routes/user"
import Productrouter from "./routes/product"
import Cartrouter from "./routes/cart"
import Orderrouter from "./routes/order"
import helmet from "helmet"
mongoose.connect(process.env.MONGO).then(() => { console.log("connected to database") })
const app = express()
var corsOptions = {
    origin: 'http://127.0.0.1:5173',
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(express.static("product_images"))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(router)
app.use(Userrouter)
app.use(Productrouter)
app.use(Cartrouter)
app.use(Orderrouter)

app.listen(process.env.PORT || 3001, () => {
    console.log(`connected to port ${process.env.PORT}`)

})