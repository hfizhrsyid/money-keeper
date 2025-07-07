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
    "money": 100000
}]

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

const generateId = () => {
    return history.length
}

app.post('/history', (req, res) => {
    const newTransaction = {
        id: generateId(),
        name: req.body.name,
        money: req.body.money
    }

    history = history.concat(newTransaction)
    res.json({ history })
})

const PORT = 4000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))