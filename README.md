soundcloudr
===========

[![Build Status](https://travis-ci.org/robcalcroft/soundcloudr.svg?branch=master)](https://travis-ci.org/robcalcroft/soundcloudr) [![npm version](https://badge.fury.io/js/soundcloudr.svg)](http://badge.fury.io/js/soundcloudr)

An express soundcloud downloader module

Prerequisites
-------------

- Node.js > 0.10.x or iojs > 1.0.4
- [NPM](https://npmjs.com)
- A Soundcloud client id - can be obtained [here](https://developers.soundcloud.com/)

Installation
------------

In your project root do:
```bash
npm install soundcloudr --production --save
```

Reference
---------

###setClientId(clientId)
Sets the Soundcloud client id for the session.

###getStreamUrl(url, callback)
Given a valid Soundcloud track url, this will give the direct stream url for that track.

###download(url, res, callback)
Given a valid Soundcloud track url, this will download the direct stream url and pipe it to the Express response object causing a download of the track to happen in the browser.

Usage
-----

Without Express
```javascript
var soundcloudr = require('soundcloudr');
var fs = require('fs');

soundcloudr.setClientId(fs.readFile('clientId.txt', 'UTF-8'));

soundcloudr.getStreamUrl('https://soundcloud.com/annie-mac-presents/free-music-monday-jakwob-fade', function(err, url) {
	if(err) {
		return console.log(err.message);
	}
	// Do something with the stream url
	console.log('My stream URL is: ' + url);
});
```

With Express
```javascript
var express = require('express');
var app = express();
var soundcloudr = require('soundcloudr');
var fs = require('fs');

soundcloudr.setClientId(fs.readFile('clientId.txt', 'UTF-8'));

app.get('/download', function(request, response, next) {
	var url = request.query.url;

	soundcloudr.download(url, response, function(err) {
		if(err) {
			response.status(err.status).json({
				message: err.message
			});
		}
	});
});
```

Disclaimer
----------

This library should not be used to infringe copyright, only download music that is free to download or is licensed in such a way that downloading will not infringe copyright.

License
-------

Licensed under the MIT license
