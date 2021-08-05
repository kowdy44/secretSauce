"use strict"
const mongoose = require('mongoose');
let mongodbURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
console.log("mongodbURI : ", mongodbURI)
// let mongodbURI = "mongodb+srv://dbUser:dbUserPassword@cluster0.hj8v8.mongodb.net"
mongoose.connect(mongodbURI + '/appdb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
}).catch((err) => {
    console.log(`Database connection error : ${err}`);
})