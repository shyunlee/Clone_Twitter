import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import tweetsRouter from './router/tweets.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(helmet())
app.use(cors())
app.use(morgan('tiny'))

app.get('/', (req, res) => {
    res.send('hello')
})

app.use('/tweets', tweetsRouter)

app.use((err, req, res, next) => {
    console.error(err)
    res.sendStatus(500)
})

app.listen(8080, () => {
    console.log('server is on 8080')
})

