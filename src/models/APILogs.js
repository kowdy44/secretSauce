"use strict"
const mongoose = require('mongoose')
const APILogsSchemaObject = {
    data: {
        type: String,
        required: true
    }
};
//Creatting schema with defined fields in SchemaObject.
const APILogsSchema = new mongoose.Schema(APILogsSchemaObject);

//Exporting the mongoose model created from Schema.
const APILogs = mongoose.model('APILogs', APILogsSchema);
module.exports = APILogs