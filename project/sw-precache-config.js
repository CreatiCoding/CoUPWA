module.exports = {
	stripPrefix: 'build/',
	staticFileGlobs: [
		'build/*.html',
		'build/*.json',
		'build/static/**/!(*map*)',
		'build/images/thumbnail/*.jpg',
		'build/images/thumbnail/*.gif',
		'build/css/*.css',
		'build/js/*.js',
		'build/fonts/*.woff',
		'build/firebase/*.js',
		'build/favicon.ico',
		'build/*.js'
	],
	dontCacheBustUrlsMatching: /\.\w{8}\./,
	swFilePath: 'build/service-worker.js'
};
