const express = require('express');
const env = require('dotenv')
const mongoose = require('mongoose');
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const cartRoute = require('./routes/cart')
const orderRoute = require('./routes/order')
const productRoute = require('./routes/product')
const stripeRoute = require('./routes/stripe')
const cors = require('cors')

const app = express();
env.config();

mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log("DB connection successful"))
        .catch((err) => console.log(err))

app.use(cors())
app.use(express.json())
app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/cart", cartRoute)
app.use("/api/order", orderRoute)
app.use("/api/product", productRoute)
app.use("/api/checkout", stripeRoute)

app.listen(process.env.PORT || 2000, (err) => {
  if(err)
    console.log(err);
  else
    console.log("Backend server is listening on port 2000");
})