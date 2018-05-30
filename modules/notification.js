const axios = require('axios')
const { telegram } = require('../contants')

async function send (msg) {
  let response = await axios.get(`https://api.telegram.org/bot${telegram.token}/sendMessage?chat_id=${telegram.chatId}&text=${msg}`)
  if (response.ok) {
    console.log('Message sent')
  }
}

module.exports = {
  send
}
