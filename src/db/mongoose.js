const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/appdb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).catch((err)=>{
    console.log(`Database connection error : ${err}`);
})