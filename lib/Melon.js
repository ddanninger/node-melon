var request = require('request'),
	querystring = require('querystring'); 
	API_URL = 'http://apis.skplanetx.com/melon';

module.exports = Melon;

function Melon(appKey) {
	this.appKey = appKey;
	
	this._performRequest = function(url, method, data, cb) {
		var stringify = querystring.stringify(data);
		if (stringify.length > 0)
			url += '?' + stringify;
		console.log("REQUEST TO",API_URL + url);
		request({
		    url: API_URL + url,
		    method: method,
		    headers: {
		        'Accept-Language': 'en_US',
		        'appKey': this.appKey
		    }
		}, cb)
	};
}

Melon.prototype.SearchArtists = function(searchTerm,count,page,cb) {
	//http://apis.skplanetx.com/melon/artists?count=10&page=1&searchKeyword=&version=1
	this._performRequest('/artists', 'GET', {
	    count: count,
	    page: page,
	    version: "1",
	    searchKeyword: searchTerm
	  }, function(error, response, data) {
		  if (!error) {
			  var data = JSON.parse(data);
			  cb(true,data)
		  }
		  else
			  cb(false,null)
	  });	
};