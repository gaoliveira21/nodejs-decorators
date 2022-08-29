const { once } = require('events')
const { createServer } = require('http')
const { randomUUID } = require('crypto')
const { setTimeout } = require('timers/promises')
const { route, responseTimeTracker } = require('./decorator')

const Db = new Map()

class Server {
  @responseTimeTracker
  @route
  static async handler(request) {
    await setTimeout(parseInt(Math.random() * 100))
    if (request.method === 'POST') {
      const data = await once(request, 'data')
      const item = JSON.parse(data)
      item.id = randomUUID()

      Db.set(item.id, item)

      return {
        statusCode: 201,
        message: item
      }
    }
    
    return {
      statusCode: 200,
      message: [...Db.values()]
    }
  }
}

const server = new Server()
createServer(Server.handler)
  .listen(3000, () => console.log('server is running at 3000'))