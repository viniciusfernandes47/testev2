const express 	= require('express')
const app 		= express()
const routes 	= require('./routes')

routes(app)

module.exports = (app)