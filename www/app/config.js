let PRODUCTION = process.env.NODE_ENV === 'production'

let Config = {}
Config.express = {
  port: process.env.EXPRESS_PORT || 80,
  ip: '0.0.0.0'
}

if (PRODUCTION) {
  // for example
  //Config.express.ip = '0.0.0.0'
}

export default Config;