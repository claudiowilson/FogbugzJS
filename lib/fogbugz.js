// Generated by CoffeeScript 1.6.3
(function() {
  var AssignCase, CallApi, CaseOptions, CloseCase, EditCase, EmailCase, EncodeOptions, FowardCase, ListProjects, LogOff, LogOn, NewCase, ReactivateCase, ReopenCase, ReplyCase, ResolveCase, SearchCases, SetURL, ViewArea, ViewCategory, ViewFixFor, ViewMailbox, ViewPerson, ViewPriority, ViewProject, ViewStatus, ViewTemplate, fogbugzURL, https, xml2js;

  https = require('https');

  xml2js = require('xml2js');

  fogbugzURL = null;

  SetURL = function(url) {
    return fogbugzURL = url + "/api.asp?";
  };

  LogOn = function(username, password, callback) {
    return CallApi("cmd=logon&email=" + username + "&password=" + password, null, function(err, result) {
      if (err) {
        return callback(new Error('Error logging in: ' + err.message));
      } else {
        return callback(null, result['token'][0]);
      }
    });
  };

  LogOff = function(token, callback) {
    return CallApi('cmd=logoff', token, function(err, result) {
      if (err) {
        return callback(new Error('Error logging off: ' + err.message));
      } else {
        return callback(null);
      }
    });
  };

  ListProjects = function(options, token, callback) {
    var command;
    options = EncodeOptions(options);
    command = 'cmd=listProjects';
    if (options['fWrite']) {
      command += "&fWrite=1";
    }
    if (options['ixProject']) {
      command += "&ixProject=" + options.ixProject;
    }
    if (options['fIncludeDeleted']) {
      command += "&fIncludeDeleted=1";
    }
    return CallApi(command, token, function(err, result) {
      if (err) {
        return callback(new Error('Error listing projects: ' + err.message));
      } else {
        return callback(null, result['projects'][0]['project']);
      }
    });
  };

  SearchCases = function(options, token, callback) {
    var command;
    options = EncodeOptions(options);
    command = 'cmd=search';
    if (options['q']) {
      command += "&q=" + options['q'];
    }
    if (options['cols']) {
      command += "&cols=" + options['cols'];
    }
    if (options['max']) {
      command += "&max=" + options['max'];
    }
    return CallApi(command, token, function(err, result) {
      if (err) {
        return callback(new Error('Error searching cases: ' + err.message));
      } else {
        return callback(null, result['cases'][0]['case']);
      }
    });
  };

  NewCase = function(options, token, callback) {
    var command;
    options = EncodeOptions(options);
    command = 'cmd=new';
    command += CaseOptions(options);
    return CallApi(command, token, function(err, result) {
      if (err) {
        return callback(new Error('Error making new case: ' + err.message));
      } else {
        return callback(null, result['case'][0]);
      }
    });
  };

  EditCase = function(options, token, callback) {
    var command;
    options = EncodeOptions(options);
    command = 'cmd=edit';
    command += CaseOptions(options);
    return CallApi(command, token, function(err, result) {
      if (err) {
        return callback(new Error('Error editing case: ' + err.message));
      } else {
        return callback(null, result['case'][0]);
      }
    });
  };

  AssignCase = function(options, token, callback) {
    var command;
    options = EncodeOptions(options);
    command = 'cmd=assign';
    command += CaseOptions(options);
    return CallApi(command, token, function(err, result) {
      if (err) {
        return callback(new Error('Error assigning case: ' + err.message));
      } else {
        return callback(null, result['case'][0]);
      }
    });
  };

  ReactivateCase = function(options, token, callback) {
    var command;
    options = EncodeOptions(options);
    command = 'cmd=reactivate';
    command += CaseOptions(options);
    return CallApi(command, token, function(err, result) {
      if (err) {
        return callback(new Error('Error reactivating case: ' + err.message));
      } else {
        return callback(null, result['case'][0]);
      }
    });
  };

  ReopenCase = function(options, token, callback) {
    var command;
    options = EncodeOptions(options);
    command = 'cmd=reopen';
    command += CaseOptions(options);
    return CallApi(command, token, function(err, result) {
      if (err) {
        return callback(new Error('Error reopening case: ' + err.message));
      } else {
        return callback(null, result['case'][0]);
      }
    });
  };

  ResolveCase = function(options, token, callback) {
    var command;
    options = EncodeOptions(options);
    command = 'cmd=resolve';
    command += CaseOptions(options);
    if (options['ixStatus']) {
      command += "&ixStatus=" + options['ixStatus'];
    }
    return CallApi(command, token, function(err, result) {
      if (err) {
        return callback(new Error('Error resolving case: ' + err.message));
      } else {
        return callback(null, result['case'][0]);
      }
    });
  };

  CloseCase = function(options, token, callback) {
    var command;
    options = EncodeOptions(options);
    command = 'cmd=close';
    command += CaseOptions(options);
    return CallApi(command, token, function(err, result) {
      if (err) {
        return callback(new Error('Error closing case: ' + err.message));
      } else {
        return callback(null, result['case'][0]);
      }
    });
  };

  EmailCase = function(options, token, callback) {
    var command;
    options = EncodeOptions(options);
    command = 'cmd=email';
    command += CaseOptions(options);
    if (options['sFrom']) {
      command += "&sFrom=" + options['sFrom'];
    }
    if (options['sTo']) {
      command += "&sTo=" + options['sTo'];
    }
    if (options['sSubject']) {
      command += "&sSubject=" + options['sSubject'];
    }
    if (options['sCC']) {
      command += "&sCC=" + options['sCC'];
    }
    if (options['sBCC']) {
      command += "&sBCC=" + options['sBCC'];
    }
    if (options['ixBugEventAttachment']) {
      command += "&ixBugEventAttachment=" + options['ixBugEventAttachment'];
    }
    return CallApi(command, token, function(err, result) {
      if (err) {
        return callback(new Error('Error emailing case: ' + err.message));
      } else {
        return callback(null, result['case'][0]);
      }
    });
  };

  ReplyCase = function(options, token, callback) {
    var command;
    options = EncodeOptions(options);
    command = 'cmd=reply';
    command += CaseOptions(options);
    if (options['sFrom']) {
      command += "&sFrom=" + options['sFrom'];
    }
    if (options['sTo']) {
      command += "&sTo=" + options['sTo'];
    }
    if (options['sSubject']) {
      command += "&sSubject=" + options['sSubject'];
    }
    if (options['sCC']) {
      command += "&sCC=" + options['sCC'];
    }
    if (options['sBCC']) {
      command += "&sBCC=" + options['sBCC'];
    }
    if (options['ixBugEventAttachment']) {
      command += "&ixBugEventAttachment=" + options['ixBugEventAttachment'];
    }
    return CallApi(command, token, function(err, result) {
      if (err) {
        return callback(new Error('Error replying to case: ' + err.message));
      } else {
        return callback(null, result['case'][0]);
      }
    });
  };

  FowardCase = function(options, token, callback) {
    var command;
    options = EncodeOptions(options);
    command = 'cmd=forward';
    command += CaseOptions(options);
    if (options['sFrom']) {
      command += "&sFrom=" + options['sFrom'];
    }
    if (options['sTo']) {
      command += "&sTo=" + options['sTo'];
    }
    if (options['sSubject']) {
      command += "&sSubject=" + options['sSubject'];
    }
    if (options['sCC']) {
      command += "&sCC=" + options['sCC'];
    }
    if (options['sBCC']) {
      command += "&sBCC=" + options['sBCC'];
    }
    if (options['ixBugEventAttachment']) {
      command += "&ixBugEventAttachment=" + options['ixBugEventAttachment'];
    }
    return CallApi(command, token, function(err, result) {
      if (err) {
        return callback(new Error('Error forwarding case: ' + err.message));
      } else {
        return callback(null, result['case'][0]);
      }
    });
  };

  CaseOptions = function(options) {
    var appendOptions;
    appendOptions = '';
    if (options['ixBug']) {
      appendOptions += "&ixBug=" + options['ixBug'];
    }
    if (options['ixBugParent']) {
      appendOptions += "&ixBugParent=" + options['ixBugParent'];
    }
    if (options['ixBugEvent']) {
      appendOptions += "&ixBugEvent=" + options['ixBugEvent'];
    }
    if (options['tags']) {
      appendOptions += "&tags=" + options['tags'];
    }
    if (options['sTags']) {
      appendOptions += "&sTags=" + options['sTags'];
    }
    if (options['sTitle']) {
      appendOptions += "&sTitle=" + options['sTitle'];
    }
    if (options['ixProject']) {
      appendOptions += "&ixProject=" + options['ixProject'];
    }
    if (options['sProject']) {
      appendOptions += "&sProject=" + options['sProject'];
    }
    if (options['ixArea']) {
      appendOptions += "&ixArea=" + options['ixArea'];
    }
    if (options['sArea']) {
      appendOptions += "&sArea=" + options['sArea'];
    }
    if (options['ixFixFor']) {
      appendOptions += "&ixFixFor=" + options['ixFixFor'];
    }
    if (options['sFixFor']) {
      appendOptions += "&sFixFor=" + options['sFixFor'];
    }
    if (options['ixCategory']) {
      appendOptions += "&ixCategory=" + options['ixCategory'];
    }
    if (options['sCategory']) {
      appendOptions += "&sCategory=" + options['sCategory'];
    }
    if (options['ixPersonAssignedTo']) {
      appendOptions += "&ixPersonAssignedTo=" + options['ixPersonAssignedTo'];
    }
    if (options['sPersonAssignedTo']) {
      appendOptions += "&sPersonAssignedTo=" + options['sPersonAssignedTo'];
    }
    if (options['ixPriority']) {
      appendOptions += "&ixPriority=" + options['ixPriority'];
    }
    if (options['dtDue']) {
      appendOptions += "&dtDue=" + options['dtDue'];
    }
    if (options['hrsCurrEst']) {
      appendOptions += "&hrsCurrEst=" + options['hrsCurrEst'];
    }
    if (options['hrsElapsedExtra']) {
      appendOptions += "&hrsElapsedExtra=" + options['hrsElapsedExtra'];
    }
    if (options['sVersion']) {
      appendOptions += "&sVersion=" + options['sVersion'];
    }
    if (options['sComputer']) {
      appendOptions += "&sComputer=" + options['sComputer'];
    }
    if (options['sCustomerEmail']) {
      appendOptions += "&sCustomerEmail=" + options['sCustomerEmail'];
    }
    if (options['ixMailbox']) {
      appendOptions += "&ixMailbox=" + options['ixMailbox'];
    }
    if (options['sScoutDescription']) {
      appendOptions += "&sScoutDescription=" + options['sScoutDescription'];
    }
    if (options['sScoutMessage']) {
      appendOptions += "&sScoutMessage=" + options['sScoutMessage'];
    }
    if (options['fScoutStopReporting']) {
      appendOptions += "&fScoutStopReporting=" + options['fScoutStopReporting'];
    }
    if (options['sEvent']) {
      appendOptions += "&sEvent=" + options['sEvent'];
    }
    if (options['cols']) {
      appendOptions += "&cols=" + options['cols'];
    }
    if (options['File1']) {
      appendOptions += "&File1=" + options['File1'];
    }
    if (options['File2']) {
      appendOptions += "&File2=" + options['File2'];
    }
    if (options['File3']) {
      appendOptions += "&File3=" + options['File3'];
    }
    if (options['File4']) {
      appendOptions += "&File4=" + options['File4'];
    }
    if (options['File5']) {
      appendOptions += "&File5=" + options['File5'];
    }
    if (options['nFilecount']) {
      appendOptions += "&nFilecount=" + options['nFilecount'];
    }
    return appendOptions;
  };

  ViewProject = function(options, token, callback) {
    var command;
    options = EncodeOptions(options);
    command = 'cmd=viewProject';
    if (options['ixProject']) {
      command += "&ixProject=" + options['ixProject'];
    }
    if (options['sProject']) {
      command += "&sProject=" + options['sProject'];
    }
    return CallApi(command, token, function(err, result) {
      if (err) {
        return callback(new Error('Error viewing project: ' + err.message));
      } else {
        return callback(null, result['project'][0]);
      }
    });
  };

  ViewArea = function(options, token, callback) {
    var command;
    options = EncodeOptions(options);
    command = 'cmd=viewArea';
    if (options['ixArea']) {
      command += "&ixArea=" + options['ixArea'];
    }
    if (options['sArea']) {
      command += "&ixArea=" + options['sArea'];
    }
    if (options['ixProject']) {
      command += "&ixProject=" + options['ixProject'];
    }
    return CallApi(command, token, function(err, result) {
      if (err) {
        return callback(new Error('Error viewing area: ' + err.message));
      } else {
        return callback(null, result['area'][0]);
      }
    });
  };

  ViewPerson = function(options, token, callback) {
    var command;
    options = EncodeOptions(options);
    command = 'cmd=viewPerson';
    if (options['ixPerson']) {
      command += "&ixProject=" + options['ixPerson'];
    }
    if (options['sEmail']) {
      command += "&sProject=" + options['sEmail'];
    }
    return CallApi(command, token, function(err, result) {
      if (err) {
        return callback(new Error('Error viewing person: ' + err.message));
      } else {
        return callback(null, result['person'][0]);
      }
    });
  };

  ViewFixFor = function(options, token, callback) {
    var command;
    options = EncodeOptions(options);
    command = 'cmd=viewFixFor';
    if (options['ixFixFor']) {
      command += "&ixProject=" + options['ixFixFor'];
    }
    if (options['sFixFor']) {
      command += "&sProject=" + options['sFixFor'];
    }
    if (options['ixProject']) {
      command += "&sProject=" + options['ixProject'];
    }
    return CallApi(command, token, function(err, result) {
      if (err) {
        return callback(new Error('Error viewing milestone: ' + err.message));
      } else {
        return callback(null, result['fixfor'][0]);
      }
    });
  };

  ViewCategory = function(options, token, callback) {
    var command;
    options = EncodeOptions(options);
    command = 'cmd=viewCategory';
    if (options['ixCategory']) {
      command += "&ixProject=" + options['ixCategory'];
    }
    return CallApi(command, token, function(err, result) {
      if (err) {
        return callback(new Error('Error viewing category: ' + err.message));
      } else {
        return callback(null, result['category'][0]);
      }
    });
  };

  ViewPriority = function(options, token, callback) {
    var command;
    options = EncodeOptions(options);
    command = 'cmd=viewPriority';
    if (options['ixPriority']) {
      command += "&ixProject=" + options['ixPriority'];
    }
    return CallApi(command, token, function(err, result) {
      if (err) {
        return callback(new Error('Error viewing priority: ' + err.message));
      } else {
        return callback(null, result['priority'][0]);
      }
    });
  };

  ViewStatus = function(options, token, callback) {
    var command;
    options = EncodeOptions(options);
    command = 'cmd=viewStatus';
    if (options['ixCategory']) {
      command += "&ixProject=" + options['ixCategory'];
    }
    if (options['ixStatus']) {
      command += "&ixProject=" + options['ixStatus'];
    }
    if (options['sStatus']) {
      command += "&ixProject=" + options['sStatus'];
    }
    return CallApi(command, token, function(err, result) {
      if (err) {
        return callback(new Error('Error viewing status: ' + err.message));
      } else {
        return callback(null, result['status'][0]);
      }
    });
  };

  ViewMailbox = function(options, token, callback) {
    var command;
    options = EncodeOptions(options);
    command = 'cmd=viewMailbox';
    if (options['ixMailbox']) {
      command += "&ixProject=" + options['ixMailbox'];
    }
    return CallApi(command, token, function(err, result) {
      if (err) {
        return callback(new Error('Error viewing mailbox: ' + err.message));
      } else {
        return callback(null, result['mailbox'][0]);
      }
    });
  };

  ViewTemplate = function(options, token, callback) {
    var command;
    options = EncodeOptions(options);
    command = 'cmd=viewTemplate';
    if (options['ixTemplate']) {
      command += "&ixProject=" + options['ixTemplate'];
    }
    return CallApi(command, token, function(err, result) {
      if (err) {
        return callback(new Error('Error viewing template: ' + err.message));
      } else {
        return callback(null, result['template'][0]);
      }
    });
  };

  EncodeOptions = function(options) {
    var key, val;
    for (key in options) {
      val = options[key];
      options[key] = encodeURIComponent(val);
    }
    return options;
  };

  CallApi = function(commandText, token, callback) {
    var GetToken, xml;
    if (token == null) {
      token = '';
    }
    if (!fogbugzURL) {
      callback(new Error('You have not specified a URL to call the API with'));
      return;
    }
    xml = '';
    GetToken = function(nullableToken) {
      if (nullableToken) {
        return "&token=" + nullableToken;
      } else {
        return '';
      }
    };
    return https.get(fogbugzURL + commandText + GetToken(token), function(response) {
      response.on('data', function(chunk) {
        return xml += chunk;
      });
      response.on('error', function(error) {
        return callback(new Error(error.message));
      });
      return response.on('end', function() {
        return xml2js.parseString(xml, function(err, result) {
          if (result['response']['error']) {
            return callback(new Error(JSON.stringify(result['response']['error'])));
          } else {
            return callback(null, result['response']);
          }
        });
      });
    });
  };

  exports.LogOn = LogOn;

  exports.LogOff = LogOff;

  exports.SetURL = SetURL;

  exports.ListProjects = ListProjects;

  exports.SearchCases = SearchCases;

  exports.FowardCase = FowardCase;

  exports.ReplyCase = ReplyCase;

  exports.EmailCase = EmailCase;

  exports.CloseCase = CloseCase;

  exports.ResolveCase = ResolveCase;

  exports.ReopenCase = ReopenCase;

  exports.ReactivateCase = ReactivateCase;

  exports.AssignCase = AssignCase;

  exports.EditCase = EditCase;

  exports.NewCase = NewCase;

  exports.ViewProject = ViewProject;

  exports.ViewArea = ViewArea;

  exports.ViewPerson = ViewPerson;

  exports.ViewFixFor = ViewFixFor;

  exports.ViewCategory = ViewCategory;

  exports.ViewPriority = ViewPriority;

  exports.ViewStatus = ViewStatus;

  exports.ViewMailbox = ViewMailbox;

  exports.ViewTemplate = ViewTemplate;

}).call(this);
