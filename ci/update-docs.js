const axios = require('axios')
const { apikey, collectionId } = require('./config')
const collection = require('../postman_collection.json')

updateDocs()

async function updateDocs () {
  try {
    const update = await axios.request({
      method: 'put',
      params: { apikey },
      url: `https://api.getpostman.com/collections/${collectionId}`,
      data: { collection }
    })

    if (update) {
      console.log(`Postman collection ${collection.info.name} updated.`)
    } else {
      console.log('Updating Postman collection failed!')
    }
  } catch (e) {
    console.log(e.response.data)
  }
}
