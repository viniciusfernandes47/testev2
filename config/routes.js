module.exports = app => {

	crawler = require('../controller/crawler')
	
	app.get(
			'/scrape',
			crawler
		)

}