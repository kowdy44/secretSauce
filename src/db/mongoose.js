"use strict"
const mongoose = require('mongoose');
console.log("process.env.MONGODB_URI : ",process.env.MONGODB_URI)
let mongodbURI=process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
mongodbURI = "mongodb+srv://dbUser:dbUserPassword@cluster0.hj8v8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(mongodbURI+'/appdb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
}).catch((err)=>{
    console.log(`Database connection error : ${err}`);
})