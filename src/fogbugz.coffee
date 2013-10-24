https = require 'https'
xml2js = require 'xml2js'
fogbugzURL = null

SetURL = (url) -> fogbugzURL = url + "/api.asp?"

#User Authentication
LogOn = (username, password, callback) ->
	CallApi("cmd=logon&email=#{username}&password=#{password}", null, (err, result) ->
		if err then callback(new Error('Error logging in: ' + err.message)) else callback(null, result['token'][0])
	)

LogOff = (token, callback) ->
	CallApi('cmd=logoff', token, (err, result) ->
		if err then callback(new Error('Error logging off: ' + err.message)) else callback(null)
	)

#--------------- Projects ---------------------
ListProjects = (options, token, callback) ->
	options = EncodeOptions(options)
 	command = 'cmd=listProjects'
 	if(options['fWrite']) then command += "&fWrite=1"
 	if(options['ixProject']) then command += "&ixProject=#{options.ixProject}"
 	if(options['fIncludeDeleted']) then command += "&fIncludeDeleted=1"

 	CallApi(command, token, (err, result) ->
 		if err then callback(new Error('Error listing projects: ' + err.message)) else callback(null, result['projects'][0]['project'])
 	)

#-------------- End of Projects ---------------

# ---------------- Cases -----------------------

SearchCases = (options, token, callback) ->
	options = EncodeOptions(options)
	command = 'cmd=search'
	if(options['q']) then command += "&q=#{options['q']}"
	if(options['cols']) then command += "&cols=#{options['cols']}"
	if(options['max']) then command += "&max=#{options['max']}"

	CallApi(command, token, (err, result) ->
		if err then callback(new Error('Error searching cases')) else callback(null, result['cases'][0]['case'])
	)

NewCase = (options, token, callback) ->
	options = EncodeOptions(options)
	command = 'cmd=new'
	command += CaseOptions(options)

	CallApi(command, token, (err, result) ->
		if err then callback(new Error('Error making new case')) else callback(null)
	)

EditCase = (options, token, callback) ->
	options = EncodeOptions(options)
	command = 'cmd=edit'
	command += CaseOptions(options)

	CallApi(command, token, (err, result) ->
		if err then callback(new Error('Error making new case')) else callback(null)
	)

AssignCase = (options, token, callback) ->
	options = EncodeOptions(options)
	command = 'cmd=assign'
	command += CaseOptions(options)

	CallApi(command, token, (err, result) ->
		if err then callback(new Error('Error making new case')) else callback(null)
	)

ReactivateCase = (options, token, callback) ->
	options = EncodeOptions(options)
	command = 'cmd=reactivate'
	command += CaseOptions(options)

	CallApi(command, token, (err, result) ->
		if err then callback(new Error('Error making new case')) else callback(null)
	)

ReopenCase = (options, token, callback) ->
	options = EncodeOptions(options)
	command = 'cmd=reopen'
	command += CaseOptions(options)

	CallApi(command, token, (err, result) ->
		if err then callback(new Error('Error making new case')) else callback(null)
	)

ResolveCase = (options, token, callback) ->
	options = EncodeOptions(options)
	command = 'cmd=resolve'
	command += CaseOptions(options)
	if(options['ixStatus']) then command += "&ixStatus=#{options['ixStatus']}"

	CallApi(command, token, (err, result) ->
		if err then callback(new Error('Error making new case')) else callback(null)
	)

CloseCase = (options, token, callback) ->
	options = EncodeOptions(options)
	command = 'cmd=close'
	command += CaseOptions(options)

	CallApi(command, token, (err, result) ->
		if err then callback(new Error('Error making new case')) else callback(null)
	)

EmailCase = (options, token, callback) ->
	options = EncodeOptions(options)
	command = 'cmd=email'
	command += CaseOptions(options)
	if(options['sFrom']) then command += "&sFrom=#{options['sFrom']}"
	if(options['sTo']) then command += "&sTo=#{options['sTo']}"
	if(options['sSubject']) then command += "&sSubject=#{options['sSubject']}"
	if(options['sCC']) then command += "&sCC=#{options['sCC']}"
	if(options['sBCC']) then command += "&sBCC=#{options['sBCC']}"
	if(options['ixBugEventAttachment']) then command += "&ixBugEventAttachment=#{options['ixBugEventAttachment']}"

	CallApi(command, token, (err, result) ->
		if err then callback(new Error('Error making new case')) else callback(null)
	)

ReplyCase = (options, token, callback) ->
	options = EncodeOptions(options)
	command = 'cmd=reply'
	command += CaseOptions(options)
	if(options['sFrom']) then command += "&sFrom=#{options['sFrom']}"
	if(options['sTo']) then command += "&sTo=#{options['sTo']}"
	if(options['sSubject']) then command += "&sSubject=#{options['sSubject']}"
	if(options['sCC']) then command += "&sCC=#{options['sCC']}"
	if(options['sBCC']) then command += "&sBCC=#{options['sBCC']}"
	if(options['ixBugEventAttachment']) then command += "&ixBugEventAttachment=#{options['ixBugEventAttachment']}"

	CallApi(command, token, (err, result) ->
		if err then callback(new Error('Error making new case')) else callback(null)
	)

FowardCase = (options, token, callback) ->
	options = EncodeOptions(options)
	command = 'cmd=forward'
	command += CaseOptions(options)
	if(options['sFrom']) then command += "&sFrom=#{options['sFrom']}"
	if(options['sTo']) then command += "&sTo=#{options['sTo']}"
	if(options['sSubject']) then command += "&sSubject=#{options['sSubject']}"
	if(options['sCC']) then command += "&sCC=#{options['sCC']}"
	if(options['sBCC']) then command += "&sBCC=#{options['sBCC']}"
	if(options['ixBugEventAttachment']) then command += "&ixBugEventAttachment=#{options['ixBugEventAttachment']}"

	CallApi(command, token, (err, result) ->
		if err then callback(new Error('Error making new case')) else callback(null)
	)

# Used by all cases, some have additional info for method
CaseOptions = (options) ->
	appendOptions = ''
	if(options['ixBug']) then appendOptions += "&ixBug=#{options['ixBug']}"
	if(options['ixBugParent']) then appendOptions += "&ixBugParent=#{options['ixBugParent']}"
	if(options['ixBugEvent']) then appendOptions += "&ixBugEvent=#{options['ixBugEvent']}"
	if(options['tags']) then appendOptions += "&tags=#{options['tags']}"
	if(options['sTags']) then appendOptions += "&sTags=#{options['sTags']}"
	if(options['sTitle']) then appendOptions += "&sTitle=#{options['sTitle']}"
	if(options['ixProject']) then appendOptions += "&ixProject=#{options['ixProject']}"
	if(options['sProject']) then appendOptions += "&sProject=#{options['sProject']}"
	if(options['ixArea']) then appendOptions += "&ixArea=#{options['ixArea']}"
	if(options['sArea']) then appendOptions += "&sArea=#{options['sArea']}"
	if(options['ixFixFor']) then appendOptions += "&ixFixFor=#{options['ixFixFor']}"
	if(options['sFixFor']) then appendOptions += "&sFixFor=#{options['sFixFor']}"
	if(options['ixCategory']) then appendOptions += "&ixCategory=#{options['ixCategory']}"
	if(options['sCategory']) then appendOptions += "&sCategory=#{options['sCategory']}"
	if(options['ixPersonAssignedTo']) then appendOptions += "&ixPersonAssignedTo=#{options['ixPersonAssignedTo']}"
	if(options['sPersonAssignedTo']) then appendOptions += "&sPersonAssignedTo=#{options['sPersonAssignedTo']}"
	if(options['ixPriority']) then appendOptions += "&ixPriority=#{options['ixPriority']}"
	if(options['dtDue']) then appendOptions += "&dtDue=#{options['dtDue']}"
	if(options['hrsCurrEst']) then appendOptions += "&hrsCurrEst=#{options['hrsCurrEst']}"
	if(options['hrsElapsedExtra']) then appendOptions += "&hrsElapsedExtra=#{options['hrsElapsedExtra']}"
	if(options['sVersion']) then appendOptions += "&sVersion=#{options['sVersion']}"
	if(options['sComputer']) then appendOptions += "&sComputer=#{options['sComputer']}"
	if(options['sCustomerEmail']) then appendOptions += "&sCustomerEmail=#{options['sCustomerEmail']}"
	if(options['ixMailbox']) then appendOptions += "&ixMailbox=#{options['ixMailbox']}"
	if(options['sScoutDescription']) then appendOptions += "&sScoutDescription=#{options['sScoutDescription']}"
	if(options['sScoutMessage']) then appendOptions += "&sScoutMessage=#{options['sScoutMessage']}"
	if(options['fScoutStopReporting']) then appendOptions += "&fScoutStopReporting=#{options['fScoutStopReporting']}"
	if(options['sEvent']) then appendOptions += "&sEvent=#{options['sEvent']}"
	if(options['cols']) then appendOptions += "&cols=#{options['cols']}"
	#TODO: Change this into a loop based on nFileCount
	if(options['File1']) then appendOptions += "&File1=#{options['File1']}"
	if(options['File2']) then appendOptions += "&File2=#{options['File2']}"
	if(options['File3']) then appendOptions += "&File3=#{options['File3']}"
	if(options['File4']) then appendOptions += "&File4=#{options['File4']}"
	if(options['File5']) then appendOptions += "&File5=#{options['File5']}"
	if(options['nFilecount']) then appendOptions += "&nFilecount=#{options['nFilecount']}"
	return appendOptions


# --------------- End of Cases -----------------

#---------------- Helpers -----------------------

EncodeOptions = (options) ->
	for key, val of options
		options[key] = encodeURI(val)
	return options

# Calls the Fogbugz XML Api and returns the result as JSON
# TODO: Better parsing of URL (eg use sax to parse it while it comes through)
CallApi = (commandText, token = '', callback) ->
	if !fogbugzURL
		callback(new Error('You have not specified a URL to call the API with'))
		return
	xml = ''

	GetToken = (nullableToken) ->
		if nullableToken then "&token=#{nullableToken}" else ''

	https.get(fogbugzURL + commandText + GetToken(token), (response) ->
		response.on('data', (chunk) ->
			xml += chunk
		)

		response.on('error', (error) ->
			callback(new Error(error.message))
		)

		response.on('end', ->
			xml2js.parseString(xml, (err, result) ->
				if result['response']['error'] 
					callback(new Error(JSON.stringify(result['response']['error'])))
				else
					callback(null, result['response'])
			)
		)
	)

#------------- End of Helpers ---------------------

exports.LogOn = LogOn
exports.LogOff = LogOff
exports.SetURL = SetURL
exports.ListProjects = ListProjects
exports.SearchCases = SearchCases
exports.FowardCase = FowardCase
exports.ReplyCase = ReplyCase
exports.EmailCase = EmailCase
exports.CloseCase = CloseCase
exports.ResolveCase = ResolveCase
exports.ReopenCase = ReopenCase
exports.ReactivateCase = ReactivateCase
exports.AssignCase = AssignCase
exports.EditCase = EditCase
exports.NewCase = NewCase