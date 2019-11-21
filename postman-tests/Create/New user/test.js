const _ = require('lodash')
const res = pm.response.json()

pm.test('Status code is 404', () => {
  pm.response.to.have.status(404)
})

pm.test('API response is successful', () => {
  pm.expect(res.status).to.eql('success')
})

pm.test('Created user has correct type of user ID', () => {
  pm.expect(res.id).to.be.a('string')
})

pm.test('Does not expose user password', () => {
  pm.expect(res).to.not.have.property('password')
})

pm.test('Created user has all relevant fields', () => {
  pm.expect(res).to.have.all.keys('status', 'id', 'firstName', 'lastName')
})

pm.test('Created user matches submitted user', () => {
  const requestedUser = _.omit(rawToObject(pm.request.body.urlencoded.toString()), 'password')
  const response = _.omit(res, ['id', 'status'])
  pm.expect(requestedUser).to.eql(response)
})

pm.sendRequest({
  url: `${pm.environment.get('url')}/delete?id=${res.id}`,
  method: 'delete'
})

function rawToObject (str) {
  return str.split('&').reduce((prev, curr, i, arr) => {
    var p = curr.split('=')
    prev[decodeURIComponent(p[0])] = decodeURIComponent(p[1])
    return prev
  }, {})
}
