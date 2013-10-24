express = require 'express'
fogbugz = require './../fogbugz'
settings = require './settings'
app = express()

app.configure( ->
	app.use(express.logger('dev'))
	app.use(express.bodyParser())
)

fogbugz.SetURL(settings.fogbugzURL)

app.get('/', (request, response) ->
	fogbugz.LogOn(settings.fogbugzUser, settings.fogbugzPassword, null, (error, token) ->
		console.log(token)
	)
)

app.listen(3000)
console.log('Listening on port 3000....')