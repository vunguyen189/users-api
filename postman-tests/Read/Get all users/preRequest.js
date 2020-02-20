const firstName = pm.variables.get('firstName')
const lastName = pm.variables.get('lastName')
const password = pm.variables.get('password')

pm.sendRequest({
  url: `${pm.environment.get('url')}/create`,
  method: 'POST',
  header: 'Content-Type:application/x-www-form-urlencoded',
  body: {
    mode: 'raw',
    raw: `firstName=${firstName}&lastName=${lastName}&password=${password}`
  }
}, (err, res) => {
  if (err) console.log(err)
  res = res.json()
  pm.globals.set('id', res.id)
})
