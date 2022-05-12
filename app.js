const express = require('express')

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
  return res.json({titulo: "Como criar API"})
});

app.listen(8080, () => {
  console.log("Servidor inciado")  
})