//For Environment variables
require('dotenv').config()/*Paasing nothing in config reads .env file by default */

const express = require('express')
require('./src/db/mongoose')
const userRouter = require('./src/routes/user')
const paragraphRouter = require('./src/routes/paragraph')
const commentsRouter = require('./src/routes/comments')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(paragraphRouter)
app.use(commentsRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

