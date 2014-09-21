node-melon
==========

A unoffical node.js wrapper for the SK planet Melon API (www.melon.com)

See API Information on: https://developers.skplanetx.com/apidoc/eng/melon/

```
var Melon = require('melon');

var api = new Melon('APIKEY');
api.SearchArtists('싸이',10,1,function(success,data) {
	console.log(data.melon);
});
```

### Methods for Search API:

`api.SearchArtists(searchTerm, count, page, callback)`

`api.SearchAlbums(searchTerm, count, page, callback)`

`api.SearchSongs(searchTerm, count, page, callback)`


### Methods for Album API:

`api.LatestAlbums(count, page, callback)`

`api.LatestAlbumsByGenre(genreId, count, page, callback)`

`api.LatestSongs(count, page, callback)`

`api.LatestSongsByGenre(genreId, count, page, callback)`



### Methods for Chart API:

`api.RealTimeCharts(count, page, callback)`

`api.TopDailySongs(count, page, callback)`

`api.TopAlbums(count, page, callback)`

`api.TopGenres(count, page, callback)`

`api.TopSongsByGenre(genreId, count, page, callback)`

`api.Genres(callback)`


