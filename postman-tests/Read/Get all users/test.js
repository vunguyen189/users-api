const res = pm.response.json()
const id = pm.globals.get('id')

pm.test('Status code is 200', () => {
  pm.response.to.have.status(200)
})

pm.test('One user exists', () => {
  pm.expect(res).to.have.length(2)
})

pm.test('User has all relevant fields', () => {
  res.forEach((val, i) => {
    if (i > 0) {
      pm.expect(val).to.have.all.keys('id', 'firstName', 'lastName')
    }
  })
})

pm.test('User passwords are not exposed', () => {
  res.forEach((val) => {
    pm.expect(val).to.not.have.property('password')
  })
})

// cleanup
pm.globals.unset('id')

pm.sendRequest({
  url: `${pm.environment.get('url')}/delete?id=${id}`,
  method: 'delete'
})
