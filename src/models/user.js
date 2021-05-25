const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs');
const error = require('../Error/error');
const jsonwebtoken = require("jsonwebtoken");
const key = require("../middleware/key.json");

userSchemaObject = {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    },
    isdeleted: {
        type: Boolean,
        default: false
    },
    tokens:[
        {
            token:{
                type:String,
                required:true,
            }
        }
    ],
    passcode:{
        type:Number
    }
};


//Creatting user schema with defined fields in userschemaObject.
const userSchema = new mongoose.Schema(userSchemaObject);

//Adding new method to user schema
/* To find user based on credentials given in this case email and password */
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.getActiveUser({email})

    if (!user) {
        // throw new Error('Unable to login')
        throw new Error('USER_CREDENTAILS_NOT_FOUND');
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('UNABLE_TO_LOGIN')
    }

    return user
}

//get active users only : based on isdeleted Flag of User.
userSchema.statics.getActiveUser = async (filter) => {
    const user = await User.findOne(filter)

    if (!user) {
        // active user not found.
        throw new Error('USER_NOT_FOUND');
    }else if(user.isdeleted){
        throw new Error('NOT_ACTIVE_USER');
    } else {
        return user;
    }

}

userSchema.methods.generateAuthToken = async function (){
    let token= jsonwebtoken.sign({_id:this._id.toString()},key["secret"]);
    this.tokens.push({token});
    await this.save();
    return token;

}

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

//Exporting the mongoose model of user created from userschema.
const User = mongoose.model('User', userSchema);
module.exports = User