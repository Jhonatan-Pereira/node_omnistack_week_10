const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
const cors = require('cors')
const { mongo_db } = require('../.env')

const app = express()
mongoose.connect(`mongodb://${mongo_db.host}:${mongo_db.port}/${mongo_db.database}?authSource=admin&retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    user: mongo_db.user,
    pass: mongo_db.password
})
.catch(e => {
  const msg = 'Não foi possível conectar ao MongoDB!'
  console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m')
})

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected!')
})

// let bodyParser = require('body-parser')
// app.use(bodyParser.urlencoded({ extended: true }))

// app.use(cors({ origin: 'http://localhost:3000' }))
app.use(cors())
app.use(express.json())
app.use(routes)


app.listen(3333)