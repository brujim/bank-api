const express = require('express')
const mongoose = require('mongoose')

// Models Import

require("./models/Account")
const Account = mongoose.model('account')

const app = express()

app.use(express.json())

//Methods
//
// List Accounts
app.get("/", (req, res) => {
  Account.find({}).then((account) => {
    return res.json(account)
  }).catch((erro) => {
    return res.status(400).json({
      error: true,
      message: "No accounts found!"
    })
  })
});
//Get account by email
app.get("/account/:email", (req, res) => {
  Account.findOne({email:req.params.email}).then((account) => {
    return res.json(account);
  }).catch((err) => {
    return res.status(400).json({
      error: 400,
      message: "Can't find any account with this email"
    })
  })
})
//Create Account
app.post('/account', (req, res) => {
  const account = Account.create(req.body, (err) => {
    if (err) return res.status(400).json({
      error: true,
      message: "Error, failed to insert on DB"
    })
    return res.status(200).json({
      error: false,
      message: "Sucess to insert on db"
    })
  })
})
//Edit Account
app.put('/account/:email', (req, res) => {
  Account.updateOne({email: req.params.email}, req.body, (err) =>{
    err ? res.status(400).json({
      error: 400,
      message: "Error, verify account credentials"
    }) : res.json({
      message: "You have been edited this account"
    })
  })
})
//Delete Account
app.delete('/account/:email', (req, res) => {
  Account.deleteOne({email: req.params.email}, (err) => {
    err ? res.status(400).json({
      error: 400,
      message: "Account not deleted"
    }) : res.json ({
      message: "Account deleted"
    })
  })
})

// Mongoose db connection

mongoose.connect('mongodb://localhost/bank', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Database Connected")
}).catch((err) =>{
  console.log("Error with database connection: ", err)
})

//API server start

app.listen(8080, () => {
  console.log("Server start")  
})