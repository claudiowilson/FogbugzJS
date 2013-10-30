settings = require './../test/lib/settings'
fogbugz  = require './../lib/fogbugz'

fogbugz.SetURL(settings.fogbugzURL)

describe 'Logging On', ->
	it 'returns a token', ->
		fogbugz.LogOn(settings.fogbugzUser, settings.fogbugzPassword, (error, token) ->
			expect(token).not.toBe(undefined)
			expect(token).not.toBe(null)
			expect(error).toBe(null)
		)
