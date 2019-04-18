
const express = require('express')
require('./src/db/mongoose')
const userRouter = require('./src/routes/user')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
// const app = express();
// const port =3000;
// const error = require("./Error/error");
// console.log(error.getError("UNABLE_TO_LOGIN"));
// app.get("/",(req,res)=>{res.send("Home page")});
// app.listen(port,()=>{console.log(`app started at port ${port} !`)});

