const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const uri = process.env.MONGODB_URI

mongoose.connect(uri)
    .then(result => {
        console.log(result)
        console.log('Connected to MongoDB!')
    })
    .catch(error => {
        console.log('Error connecting to MongoDB', error.message)
    })

const historySchema = new mongoose.Schema({
    name: String,
    money: Number,
    date: String,
})

historySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('History', historySchema)