const mongoose = require('mongoose')

const date = new Date()
const getDate =  (date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear())


const Account = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true, 
    },
    password:{
        type: String,
        required: true,
    },
    start_date: {
        type: String,
        default: getDate,
    },
    credits: {
        type: Number,
        default: 0,
    }
},
{
    timestamps: true,
})

mongoose.model('account', Account)