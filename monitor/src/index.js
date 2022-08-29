function route(target, { kind, name }) {
  console.log({ target, kind, name })
  return target
}

@route
class Server {

}

const server = new Server()