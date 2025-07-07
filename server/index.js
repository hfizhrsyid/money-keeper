const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

let money = 0;
let history = [{
        id: 0,
        "name": "hello",
        "money": 100000,
        "date": "20/01/2020"
    },
    {
        id: 1,
        "name": "haha",
        "money": 1000,
        "date": "21/01/2020"
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
    res.json({ history })
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
    const newTransaction = {
        id: generateId(),
        name: req.body.name,
        money: req.body.money,
        date: new Date().toISOString()
    }

    history = history.concat(newTransaction)
    res.json({ history })
})

app.delete('/history/:id', (req, res) => {
    history = history.filter(his => his.id !== Number(req.params.id))

    res.json({ history })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))