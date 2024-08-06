const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const mongodb = require('./config/mongodb')
const FunctionInital = require('./service/FunctionInitial')
const morgan = require('morgan')
const Errors = require('./error/Error')
const cookieParser = require('cookie-parser')

const  { createClient } =  require("redis");
const client = createClient()

module.exports = client

require('dotenv').config()


const app = express()

app.use(
    cors({
      origin: [
        "*"
      ],
      credentials: true,
    })
  );
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))
app.use(cookieParser())


mongoose.connect(mongodb.URL).then(async() => {
    await FunctionInital()
    console.log('database connected successfully!')
}).catch((err) => {
    console.log('connection error : ',err)
    process.exit()

})



const PORT = process.env.PORT || 8080

const indexRoute = require('./routes/index.routes')

app.use(indexRoute)


app.get('/',(req,res) => {
    res.json({
        message : "Welcome to OWW Dashboard Application System!"
    })
})

app.use(Errors)



app.listen(PORT, () => {
    console.log(`server started on PORT ${PORT}`)
    client.connect().then(() => console.log('redis connected successfully!')).catch((err) => {
        console.log(err)
    })
    
})

