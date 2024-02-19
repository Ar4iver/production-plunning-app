const fs = require('fs')
const jsonServer = require('json-server')
const path = require('path')
const http = require('http')
const plansController = require('./plansController.js')
const detailsController = require('./detailsController.js')
const getDetailByIdController = require('./getDetailByIdController.js')

const server = jsonServer.create()

const router = jsonServer.router(path.resolve(__dirname, 'db.json'))

server.use(jsonServer.defaults({}))
server.use(jsonServer.bodyParser)

server.use(router)
server.post('/plans', plansController().addPlan)
server.get('/details', detailsController().getAllDetails)
server.get('/details/:id', getDetailByIdController().getDetailById)

// запуск сервера
const HTTP_PORT = 8000

const httpServer = http.createServer(server)

httpServer.listen(HTTP_PORT, () => {
	console.log(`server is running on ${HTTP_PORT} port`)
})
