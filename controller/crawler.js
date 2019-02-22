const scrapePage = require('./scrapepage')
const url = 'https://www.hotelurbano.com/afiliados/salvatur'

module.exports = async (req, res) => {
	const json = await scrapePage(url)
	res.json(json)
}