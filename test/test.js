var assert = require("assert");
var S = require('../soundcloudr.js');

describe('Module Testing', function() {

	it('should have an initialised clientId variable', function() {
		assert.equal(typeof S.clientId, 'undefined')
	})

	describe('getClientId()', function() {
		it('should return the clientid if it is set', function() {
			S.clientId = 12;
			assert.equal(S.getClientId(), S.clientId);
		})
	})

	describe('isValidResponse()', function() {
		it('should return false if the object has a `pop` method', function() {
			assert.equal(S.isValidResponse({pop: function() {}}), false)
		})
		it('should return true if the object does not have a `pop` method', function() {
			assert.equal(S.isValidResponse({}), true)
		})
	})

	describe('isStreamable()', function() {
		it('should return true if the object\'s `streamable` property is not false and there is a `stream_url` set', function() {
			assert.equal(S.isStreamable({streamable: true, stream_url: 'test'}), true)
		})

		it('should return false if the object\'s `streamable` property is not false but there is no `stream_url` property set', function() {
			assert.equal(S.isStreamable({streamable: true}), false)
		})
	})

	describe('createStreamUrl()', function() {
		it('should throw an error if a client id is not set', function() {
			S.clientId = undefined;
			assert.throws(S.createStreamUrl, Error)
		})

		it('should, when recieving a valid data object, append the current client id onto the string and return it', function() {
			S.clientId = '123456';
			assert.equal(S.createStreamUrl({stream_url: 'http://example.com'}), 'http://example.com?client_id=123456');
		})

		it('should use an ampersand in the URL if the URL already has a ? in it', function() {
			S.clientId = '123456';
			assert.equal(S.createStreamUrl({stream_url: 'http://example.com?test=1'}), 'http://example.com?test=1&client_id=123456');
		})
	})

	describe('setClientId()', function() {
		it('should set the client id to be what the user passed in', function() {
			S.setClientId('12345');
			assert.equal(S.getClientId(), '12345')
		})

		it('should throw an error when no client id is passed in', function() {
			assert.throws(S.setClientId, Error)
		})
	})

	describe('getStreamUrl()', function() {

		it('should throw an error if there is no URL', function() {
			assert.throws(S.getStreamUrl, Error)
		})

		it('should return a valid stream url when passed the Soundcloud track URL', function(done) {
			S.setClientId(process.env.SCKEY)
			S.getStreamUrl('https://soundcloud.com/gramatik/straight-off-the-block', function(string) {
				// Could improve test
				assert.equal(/https:\/\/api.soundcloud.com\/tracks.+/.test(string), true);
				done();
			})
		})
	})
})
