import http from 'http'
import 'dotenv/config'

const PORT: string|number = process.env.PORT || 3000;

const app: http.Server = http.createServer((req: http.IncomingMessage, res: http.OutgoingMessage) => {
    console.log(req.url);
    console.log(req.method);
    res.end('done')
})

app.listen(PORT, (): void => {
    console.log(`Server running at http://localhost:${PORT}`)
})

