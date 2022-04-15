"use strict"
const mongoose = require('mongoose');
let mongodbURI;
if (process.env.LOCAL_DB =='false') {
    mongodbURI = process.env.MONGODB_URI;
} else { 
    mongodbURI = 'mongodb://127.0.0.1:27017'
}
console.log("process.env.LOCAL_DB : ", process.env.LOCAL_DB)
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