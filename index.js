const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8000

app.use(bodyParser.json())

require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(`${process.env.URL}/${process.env.DB_NAME}`, {
  useNewUrlParser: true
})

const User = mongoose.model('User', {
  name: String,
  age: Number,
  email: String
})

app.get('/', (req, res) => {
  res.send({
    message: 'Hello Word'
  })
})

app.get('/users', async (req, res) => {
  res.send({
    message: 'create new user',
    users: await User.find()
  })
})

app.post('/users', async (req, res) => {
  const newUser = new User({
    name: req.body.name || null,
    age: req.body.age || null,
    email: req.body.email || null
  })

  await newUser.save()

  res.send({
    message: 'Created new user',
    newUser: newUser
  })
})

app.delete('/users/:id', async (req, res) => {
  const id = req.params.id

  await User.findByIdAndDelete(id)

  res.send({
    message: 'Deleted one user by id',
    id: id
  })
})

app.delete('/users', async (req, res) => {
  await User.deleteMany()

  res.send({
    message: 'Deleted all users',
    users: await User.find()
  })
})

app.listen(port, () => {
  console.log(`Express aap is Running ${port}`)
})
