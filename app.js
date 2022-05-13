const express = require('express')
const mongoose = require('mongoose')

// Models Import

require("./models/Account")
const Account = mongoose.model('account')

const app = express()

app.use(express.json())

//Methods

app.get("/", (req, res) => {
  return res.json({titulo: "Como criar API"})
});

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