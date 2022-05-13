const mongoose = require('mongoose')

const Account = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    }
},
{
    timestamps: true,
})

mongoose.model('account', Account)