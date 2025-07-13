require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const History = require('./models/history')

app.use(cors())

app.use(cors({
  origin: 'https://money-keeper-fe.onrender.com'
}));

app.use(express.json())
morgan.token('data', (req) => JSON.stringify(req.body))

app.use(morgan(':method :url :status : res[content-length] - :response-time ms :data'))

let money = 0;
let history = [{
        "name": "hello",
        "money": 100000,
        "date": "Mon, 06 Jul 2025 09:37:28 GMT"
    },
    {
        "name": "haha",
        "money": 1000,
        "date": "Mon, 07 Jul 2025 09:37:28 GMT"
    }
]

app.get('/', (req, res) => {
    res.send('Working')
})

app.get('/money', (req, res) => {
    res.json({ money })
})

app.post('/money', (req, res) => {
    money = req.body.money
    res.json({ money })
})

app.get('/history', (req, res) => {
    History.find({}).then(result => {
        res.json(result)
    })
})

app.get('/history/:id', (req, res) => {
    const id = Number(req.params.id)
    const searched = history.find(his => his.id === id)
    if (searched) {
        res.json(searched)
    } else {
        res.status(404).end()
    }
})

const generateId = () => {
    return history.length
}

app.post('/history', (req, res) => {
    const newTransaction = new History({
        name: req.body.name,
        money: req.body.money,
        date: new Date().toUTCString()
    })

    newTransaction
        .save()
        .then(result => {
            res.json(newTransaction)
        })
        .catch(error => console.log(error.message))
})

app.delete('/history/:id', (req, res) => {
    history = history.filter(his => his.id !== Number(req.params.id))

    res.json({ history })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))