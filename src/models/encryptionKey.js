"use strict"
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const EncryptionKeySchemaObject = {
    username: {
        type: String,
        required:true
    },
    useremail: {
        type: String,
        unique: true,
        required: true
    },
    keys:[
        {
            key:{
                type:String,
                required:true,
            }
        }
    ]
};
//Creatting schema with defined fields in SchemaObject.
const EncryptionKeySchema = new mongoose.Schema(EncryptionKeySchemaObject);

//method is being used here becaz method is currently being called after an instance is being created
EncryptionKeySchema.statics.createAndStoreKey = async function (username,useremail,password) {
    let obj = await EncryptionKey.findOne({ useremail: useremail });
    if (!obj) {
        obj = new EncryptionKey({ username: username, useremail: useremail })
    }
    let stringData = useremail + password + Date.now();
    let key= await bcrypt.hash(stringData,10);
    obj.keys.push({ key });
    await obj.save();
    return;
}
//Exporting the mongoose model created from Schema.
const EncryptionKey = mongoose.model('EncryptionKey', EncryptionKeySchema);
module.exports = EncryptionKey;