const fs = require('fs')
const path = require('path')

const ruta = path.join(__dirname, 'data.json')

function generarId(frutas) {
    let mayorId = 0;

    frutas.forEach((fruta) => {
        if (Number(fruta.id) > mayorId) {
            mayorId = Number(fruta.id);
        }
    });

    return mayorId + 1;
}

function read() {
    return new Promise((resolve, reject) =>{
        fs.readFile(ruta, 'utf8', (error, result) => {   
            if(error) reject(new Error('Error. No se puede leer'))

            resolve(JSON.parse(result))
        })
    })
}

function write(newData){
    return new Promise((resolve, reject) =>{
        fs.writeFile(ruta, JSON.stringify(newData , null , "\t"), "utf8", (error) => {
            if(error) reject(new Error('Error. No se puede escribir'))

            resolve(true)
        })
    })
}


async function getAll() {
    const frutas = await read()
    return frutas
}

async function getOneById(id){
    if(!id) throw new Error('Error.El id está indefinido')

    const frutas = await read()
    const fruta = frutas.find((e) => e.id === id)

    if(!fruta) throw new Error ('Error. El id ingresado no corresponde a ningúna de las frutas que tenemos en nuestra base de datos')

    return fruta

}

async function create(fruta){
    if(!fruta?.imagen || !fruta?.nombre || !fruta?.importe || !fruta?.stock) throw new Error(`Error. Faltan datos. Para crear una fruta se necesita imagen, nombre, importe y stock`)

    let frutas = await read()
    const frutaConInd = {id: generarId(frutas), ...fruta}

    frutas.push(frutaConInd)
    await write(frutas)

    return frutaConInd
}

async function update(fruta){
    if(!fruta?.id || !fruta?.imagen || !fruta?.nombre || !fruta?.importe || !fruta?.stock) throw new Error('Errror. Los datos están incompletos. Debe completar todos los datos para poder actualizar una fruta')

    let frutas = await read()
    const indice = frutas.findIndex((e) => e.id === fruta.id)

    if (indice < 0 )throw new Error ('Error. El Id no corresponde a una fruta existente') 

    frutas[indice] = fruta
    await write(frutas)

    return frutas[indice]
}

async function destroy(id){
    if(!id) throw new Error('Error. El id está indefinido')

    let frutas = await read()
    const indice = frutas.findIndex((e) => e.id === id)

    if(indice < 0) throw new Error ('Error. El id ingresado no corresponde a ningúna de las frutas que tenemos en nuestra base de datos')

    const fruta = frutas[indice]
    frutas.splice(indice,1)
    await write(frutas)

    return fruta
}

module.exports = { getOneById, getAll, create, update, destroy}