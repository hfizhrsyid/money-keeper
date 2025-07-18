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

const peopleSchema = new mongoose.Schema({
    name: String, 
    transactionMade: Number,
    balance: Number
})

peopleSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('People', peopleSchema)