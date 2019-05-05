const mongoose = require('mongoose');
console.log("process.env.MONGODB_URI : ",process.env.MONGODB_URI)
let mongodbURI=process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
mongoose.connect(mongodbURI+'/appdb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).catch((err)=>{
    console.log(`Database connection error : ${err}`);
})