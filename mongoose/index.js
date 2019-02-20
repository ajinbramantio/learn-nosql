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

const namePersonal = new User({
  name: 'Ajin',
  age: 17
})

namePersonal.save().then(() => console.log('Created new user'))
