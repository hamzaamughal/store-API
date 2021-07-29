require('dotenv').config()
// async errors
require('express-async-errors')

const express = require('express')
const app = express()

const connectDB = require('./db/connect')
const prodcutsRouter = require('./routes/products')

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

//middleware
app.use(express.json())

//Routes
app.get('/', (req, res) => {
    res.send('<h2>Store API</h2><a href="/api/v1/products">products route</a>')
})

app.use('/api/v1/products', prodcutsRouter)

//products route

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
    try {
        //connectDB
        await connectDB(process.env.MONGO_URI)
        app.listen(3000, console.log(`server is listening on port ${port}`))
    } catch (error) {
        console.log(error);
    }
}
start()