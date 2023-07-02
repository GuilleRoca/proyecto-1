const fs = require('fs')
const path = require('path')

const ruta = path.join(__dirname, 'data.json')

function leer() {
    return new Promise((resolve, reject) =>{
        fs.readFile(ruta, 'utf-8', (error, result) => {   
            if(error) reject(new Error('Error. No se puede leer'))

            resolve(JSON.parse(result))
        })
    })
}




async function findAll() {
    const frutas = await leer()
    return frutas
}

module.exports = { findAll }