// Criar uma função que recebe um parâmetro 
// log.txt
// se o arquivo não existe, deve-se criar o log.txt
// se o arquivo existe, deve-se adicionar o conteúdo enviado por par em uma nova linha
// adicionar no log a data e hora que foi gravado

const fs = require('fs')
const logFileName = 'log.txt'

const log = (content) => {
    fs.appendFileSync(logFileName, content)
}

module.exports = log