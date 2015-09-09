var version = new Date().valueOf();
seajs.config({
  base: './script',
  alias: {
    'wwj': 'b/wwj.js',
    "jquery" : 'http://code.jquery.com/jquery-1.8.3.min.js'
  },
  paths : {
	'd' : 'dist',
	'b' : 'base'
  },
  debug: false,
	map: [
    [/^.*$/, function(url) {
        return url += (url.indexOf('?') == -1 ? '?' : '&') + 'version=' + version;
    }]
]
});
