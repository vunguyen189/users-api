const express = require('express')
const bodyParser = require('body-parser')
const _ = require('lodash')
const uuidv4 = require('uuid/v4')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const users = []
const badRequest = { status: 'invalid request' }
const requiredUserKeys = ['firstName', 'lastName', 'password']

app.post('/create', (req, res) => {
  const user = _.pick(req.body, requiredUserKeys)

  if (validUser(user)) {
    Object.assign(user, { id: uuidv4() })
    users.push(user)
    res.json(strip(user))
  } else {
    res.json(badRequest)
  }
})

app.get('/get', (req, res) => {
  const { query } = req
  const action = Object.keys(req.query)[0]

  const paths = {
    all: users,
    id: filterUsers(query, 'id'),
    firstName: filterUsers(query, 'firstName')
  }

  res.json(strip(paths[action]) || badRequest)
})

function validUser (user) {
  return requiredUserKeys.every((key) => user.hasOwnProperty(key))
}

function strip (res) {
  if (Array.isArray(res)) {
    return res.map(({ password, ...keep }) => keep)
  } else {
    return _.omit(res, ['password'])
  }
}

function filterUsers (query, key) {
  return users.filter((user) => user[key] === query[key])
}

app.listen(3000, () => console.log(`Running!`))
