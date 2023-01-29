const bodyParser = require('body-parser')

const roles = require('./rolesRoute')
const profiles = require('./profilesRoute')
// //adicionamos as rotas de niveis e turmas
// const niveis = require('./niveisRoute')
// const turmas = require('./turmasRoute')

//adicionamos as instâncias de níveis e turmas
//e refatoramos um pouco a função
module.exports = app => {
    app.use(
      bodyParser.json(),
      bodyParser.urlencoded({ extended: false }),
      roles,
      profiles
      )
    }