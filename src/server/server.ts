import http from 'http'
import EventEmitter  from 'events'

export class Application {
    server: http.Server
    emitter: EventEmitter
    middlewares: any []

    constructor() {
        this.emitter = new EventEmitter()
        this.server = this._createServer()
        this.middlewares = []
    }

    listen(port: string|number, callback: any ):void {
        this.server.listen(port, callback)
    }

    use(middleware: any):void {
        this.middlewares.push(middleware)
    }

    _createServer(): http.Server {
        return http.createServer((req: http.IncomingMessage, res: http.OutgoingMessage) => {
            let body = ""

            req.on('data', (chunk: any) => {
                body += chunk;
             })

             req.on('end', () => {
                console.log(body)
             })

        })
    } 

}