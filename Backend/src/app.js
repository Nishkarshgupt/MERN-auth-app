require("dotenv").config()
const express = require("express")
const authRoutes = require("./routes/auth.route")
const productRoutes = require("./routes/product.route")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())


app.get("/ping", (req, res)=>{
    res.send("Hello Auth")
})

app.use("/auth", authRoutes)
app.use("/products", productRoutes)

module.exports = app