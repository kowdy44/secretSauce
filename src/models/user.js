const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs');
const error = require('../Error/error');

userSchemaObject={
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
    }
};


//Creatting user schema with defined fields in userschemaObject.
const userSchema = new mongoose.Schema(userSchemaObject);

//Adding new method to user schema
/* To find user based on credentials given in this case email and password */
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        // throw new Error('Unable to login')
        throw new Error(error.getError('UNABLE_TO_LOGIN'));
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error(error.getError('UNABLE_TO_LOGIN'))
    }

    return user
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