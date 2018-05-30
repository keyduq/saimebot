function configure (driver) {
  // do something when app is closing
  process.on('exit', exitHandler.bind(null, {cleanup: true, driver}))

  // catches ctrl+c event
  process.on('SIGINT', exitHandler.bind(null, {exit: true, driver}))

  // catches "kill pid" (for example: nodemon restart)
  process.on('SIGUSR1', exitHandler.bind(null, {exit: true, driver}))
  process.on('SIGUSR2', exitHandler.bind(null, {exit: true}))

  // catches uncaught exceptions
  process.on('uncaughtException', exitHandler.bind(null, {exit: true, driver}))
}

function exitHandler (options, err) {
  if (options.cleanup) {
    if (options.driver) {
      console.log('clean up driver')
      options.driver.quit()
    }
  }
  if (err) console.log(err.stack)
  if (options.exit) process.exit()
}

module.exports = configure
