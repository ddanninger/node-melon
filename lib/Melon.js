var request = require('request'), 
	querystring = require('querystring'), 
	extend = require('util')._extend, 
	API_URL = 'http://apis.skplanetx.com/melon';

module.exports = Melon;

function Melon(appKey, options) {
	var me = this;
	this.appKey = appKey;
	this.options = extend({
		lang : 'en_US',
		apiVersion: '1'
	}, options);

	this._performRequest = function(url, method, data, cb) {
		var stringify = querystring.stringify(data);
		if (stringify.length > 0)
			url += '?' + stringify;
		console.log('REQUEST TO', API_URL + url);
		request({
			url : API_URL + url,
			method : method,
			headers : {
				'Accept-Language' : this.options.lang,
				'appKey' : this.appKey
			}
		}, cb)
	};

	this._search = function(path, searchTerm, count, page, cb) {
		this._performRequest(path, 'GET', {
			count : count,
			page : page,
			version : this.options.apiVersion,
			searchKeyword : searchTerm
		}, function(error, response, data) {
			me._resultHandler(error, response, data, cb);
		});
	};
	
	this._pagedQuery = function(path, count, page, cb) {
		this._performRequest(path, 'GET', {
			count : count,
			page : page,
			version : this.options.apiVersion
		}, function(error, response, data) {
			me._resultHandler(error, response, data, cb);
		});
	};
	
	this._resultHandler = function(error, response, data, cb) {
		if (!error) {
			var data = JSON.parse(data);
			cb(true, data.melon)
		} else
			cb(false, null)
	};
}

/* Search API */

Melon.prototype.SearchArtists = function(searchTerm, count, page, cb) {
	this._search('/artists', searchTerm, count, page, cb);
};

Melon.prototype.SearchAlbums = function(searchTerm, count, page, cb) {
	this._search('/albums', searchTerm, count, page, cb);
};

Melon.prototype.SearchSongs = function(searchTerm, count, page, cb) {
	this._search('/songs', searchTerm, count, page, cb);
};

/* Album API */

Melon.prototype.LatestAlbums = function(count, page, cb) {
	this._pagedQuery('/newreleases/albums', count, page, cb);
};

Melon.prototype.LatestAlbumsByGenre = function(genreId, count, page, cb) {
	this._pagedQuery('/newreleases/albums/'+genreId, count, page, cb);
};

Melon.prototype.LatestSongs = function(count, page, cb) {
	this._pagedQuery('/newreleases/songs', count, page, cb);
};

Melon.prototype.LatestSongsByGenre = function(genreId,count, page, cb) {
	this._pagedQuery('/newreleases/songs/'+genreId, count, page, cb);
};

/* Charts API */

Melon.prototype.RealTimeCharts = function(count, page, cb) {
	this._pagedQuery('/charts/realtime', count, page, cb);
};

Melon.prototype.TopDailySongs = function(count, page, cb) {
	this._pagedQuery('/charts/todaytopsongs', count, page, cb);
};

Melon.prototype.TopAlbums = function(count, page, cb) {
	this._pagedQuery('/charts/topalbums', count, page, cb);
};

Melon.prototype.TopGenres = function(count, page, cb) {
	this._pagedQuery('/charts/topgenres', count, page, cb);
};

Melon.prototype.TopSongsByGenre = function(genreId, count, page, cb) {
	this._pagedQuery('/charts/topgenres/'+genreId, count, page, cb);
};

Melon.prototype.Genres = function(cb) {
	this._performRequest('/genres', 'GET', {
		version : this.options.apiVersion
	}, function(error, response, data) {
		me._resultHandler(error, response, data, cb);
	});
};