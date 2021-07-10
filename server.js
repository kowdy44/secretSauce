
const express = require('express')
require('./src/db/mongoose')
const userRouter = require('./src/routes/user')
const paragraphRouter = require('./src/routes/paragraph')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(paragraphRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

