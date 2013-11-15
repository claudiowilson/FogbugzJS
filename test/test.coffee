express = require 'express'
fogbugz = require './../../lib/fogbugz'
settings = require './settings'
app = express()

app.configure( ->
	app.use(express.logger('dev'))
	app.use(express.bodyParser())
)

fogbugz.SetURL(settings.fogbugzURL)

app.get('/', (request, response) ->
	fogbugz.LogOn(settings.fogbugzUser, settings.fogbugzPassword, (error, token) ->
		fogbugz.ListProjects({'fWrite': true, 'ixProject': 1, 'fIncludeDeleted': 1}, token, (err, result) ->
			if err then console.log(err.message) else console.log(result)
		)
	)
)

app.listen(3000)
console.log('Listening on port 3000....')