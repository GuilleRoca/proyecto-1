const express = require('express')
const {findAll} = require("./database/data.manager.js")

require('dotenv').config()

const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.get('/frutas', (req, res) => {
    findAll()
        .then((coches) => res.status(200).send(coches))
        .catch((error) => res.status(400).send(error.message));
})


server.use('*', (req, res) => {
    res.status(404).send(`<h1>Error 404</h1><h3>La URL indicada no existe en este servidor</h3>`);
})

server.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
    console.log(`Ejecutandose en http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/frutas`);
})