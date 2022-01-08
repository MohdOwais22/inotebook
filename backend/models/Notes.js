const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        default:"general"
    },
    date:{
        type:date,
        default:Date.now
    },
})

module.exports = mongoose.model('user',noteSchema);