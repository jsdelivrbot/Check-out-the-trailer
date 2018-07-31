const express = require("express")
const path = require("path")

const port = process.env.PORT || 8080
const server = express()
server.use(express.static(__dirname))

server.get("*", (req,res) => {
  res.sendFile(path.resolve(__dirname, "index.html"))
})

server.listen(port)
console.log("Serveur en écoute sur le port : ", port);
