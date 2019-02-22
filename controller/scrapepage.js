const fs = require('fs');
const pupt = require('puppeteer')

const scrape = async url => {

	const browser = await await pupt.launch({
		headless: true,
		args: [
		  '--no-sandbox',
		  '--disable-setuid-sandbox',
		  '--disable-dev-shm-usage'
		],
	  });
	const page = await browser.newPage()

	await page.goto(url, {
                waitUntil: 'networkidle2',
                timeout: 3000000
            })

	const result = await page.evaluate(() => {

		let data = []
		const destination = [].slice.call(document.querySelectorAll('.offer-card__title'))
		const desconto = [].slice.call(document.querySelectorAll('.promotion__tag-discount'))
		const subtitulo = [].slice.call(document.querySelectorAll('.offer-card__subtitle'))
		const price = [].slice.call(document.querySelectorAll('.atomic-price.offer-card__price-number'))
		const link = [].slice.call(document.querySelectorAll('.offer-card__link'))
		
		
		//const imagem = [].slice.call(document.querySelector('.offer-card__image').getPropertyValue("background-image"))
		//const imaginha = document.querySelector('.offer-card__image').style.backgroundImage.substring(5, document.querySelector('.offer-card__image').style.backgroundImage.length -2)
		
		let number = 1
		destination.forEach((item, index) => {
			let a = '.hu-horizontal-offers-collection--item:nth-child('+number+') .offer-card__image';
			data.push({
				destination: item.innerText,
				price: price[index].innerText,
				subtitulos: subtitulo[index].innerText,
				desconto: desconto[index].innerText,
				link: link[index].href,
				imagem: getComputedStyle(document.querySelector(a)).backgroundImage.slice(5,-2)
			})
			number++
		})
		
		return data;
		
	})
	fs.writeFile(__dirname +"/pacotes.json", JSON.stringify(result), function(err) {
		if (err) throw err;
		console.log('complete');
		}
	);
	console.log('Query results', result)

	const resultado = await page.evaluate(() => {

		let data = []
		const destination = [].slice.call(document.querySelectorAll('.product-card__content-main h3'))
		const cidade = [].slice.call(document.querySelectorAll('.product-card__content-main strong'))
		const price = [].slice.call(document.querySelectorAll('.atomic-price.product-card__price'))
		const desconto = [].slice.call(document.querySelectorAll('.promotion__tag-discount'))
		const imagem = [].slice.call(document.querySelectorAll('.product-card__top'))
		const link = [].slice.call(document.querySelectorAll('.product-card__link'))
		let number = 1
		destination.forEach((item, index) => {
			data.push({
				destino: item.innerText,
				cidade: cidade[index].innerText,
				preco: price[index].innerText,
				desconto: desconto[index].innerText,
				link: link[index].href,
				imagem: imagem[index].innerHTML
			})
		})

		return data

	})

	fs.writeFile(__dirname +"/hoteis.json", JSON.stringify(resultado), function(err) {
		if (err) throw err;
		console.log('complete');
		}
	);

	console.log('Querydo PT results', resultado)

	browser.close()

	return result
	return resultado
}

module.exports = url => {
	return scrape(url).then(result => result)
}
