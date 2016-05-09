'use strict'

const http = require('http')
const url = require('url')

const utils = require('./utils')
const bot = require('./bot')

const port = process.env.PORT || 8000

const server = http.createServer((request, response) => {

	response.statusCode = 200

	if (request.method === 'GET') {
		response.setHeader('Content-Type', 'text/plain')

		let query = utils.getUrlQuery(request.url)

		if (!utils.validFBConnection(response, query))
			return

		response.end(query['hub.challenge'])
	}

	else if (request.method === 'POST') {	
		let json = ''

		request.on('data', (data) => {
			json += data
		})

		request.on('end', () => {
			bot.logMessage('POST request', JSON.parse(json))
			response.end()
		})
	}
	
})

server.listen(port, () => {
  bot.logMessage('JavaScript Tips Bot is alive, waiting for Zuckerberg requests...')
});