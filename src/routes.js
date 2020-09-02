const { Router } = require('express')
const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')

const routes = Router()

/**
 *  Query Params: req.query (filtros, ordenação, paginação...)
 *  Route Params: req.params (indentificar um recurso para alterar ou deletar)
 *  Body: req.body (dados para criação ou alteração de um registro)
 */

routes.get('/devs', DevController.index)
routes.post('/devs', DevController.store)

routes.get('/search', SearchController.index)

module.exports = routes