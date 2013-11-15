express = require 'express'
fogbugz = require './../../lib/fogbugz'
settings = require './settings'
app = express()

app.configure( ->
	app.use(express.logger('dev'))
	app.use(express.bodyParser())
	app.use(express.cookieParser('testadoodle'))
)

fogbugz.SetURL(settings.fogbugzURL)

app.get('/', (request, response) ->
	fogbugz.LogOn(settings.fogbugzUser, settings.fogbugzPassword, (error, token) ->
		expiry = new Date();
		expiry.setMonth(expiry.getMonth() + 1)
		response.cookie('token', token, {expires : expiry, httpOnly:true})
		fogbugz.ListProjects({'fWrite': true, 'ixProject': 1, 'fIncludeDeleted': 1}, token, (err, result) ->
			if err then console.log(err.message) else response.send(200)
		)
	)
)

app.get('/cases', (request, response) ->
	fogbugz.SearchCases({q: 'assignedTo:"Claudio Wilson"', max : 20, cols :'sTitle'}, request.cookies.token, (err, result) ->
		if err then console.log(err.message) else console.log(result); response.send(200)
	)
)

app.get('/views', (request, response) ->
	fogbugz.ViewPerson({ixPerson:2}, request.cookies.token, (err, result) ->
		if err then console.log(err.message) else console.log(result)
	)
)

app.listen(3000)
console.log('Listening on port 3000....')