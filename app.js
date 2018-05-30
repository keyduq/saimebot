const { credentials, urls, timeout, elements } = require('./contants')
const { Builder, By, until } = require('selenium-webdriver')
const notification = require('./modules/notification')
const exitHandler = require('./modules/exitHandler')

require('console-stamp')(console, [])

let driver = new Builder().forBrowser('firefox').build()
exitHandler(driver)
login(false)

async function waitLoading () {
  let loader = await driver.findElement(By.id('loader'))
  await driver.wait(until.elementIsNotVisible(loader), timeout)
}

async function login (isRetrying) {
  if (isRetrying) {
    await driver.navigate().to(urls.login)
  } else {
    await driver.get(urls.login)
  }
  try {
    await waitLoading()
    // let test = await driver.executeAsyncScript(scripts.statusCode)
    // console.log(test)
    await driver.findElement(By.name(elements.loginFormUsername)).sendKeys(credentials.user)
    await driver.findElement(By.name(elements.loginFormPassword)).sendKeys(credentials.pwd)
    // await driver.executeAsyncScript('$("#loader").hide()')
    await driver.findElement(By.name(elements.loginSubmit)).click()
  } catch (err) {
    console.error(err)
    console.info('Retrying login...')
    return login(true)
  }
  await tramite()
}

async function tramite (isRefresh) {
  try {
    await driver.wait(until.urlIs(urls.tramite), timeout)
    await driver.navigate().to(urls.agilizacion)
  } catch (err) {
    console.error(err)
    let url = await driver.getCurrentUrl()
    if (url !== urls.tramite) return invalidatedLogin()
    console.log('Retrying tramite...')
    return tramite(true)
  }
  await agilizacion(false)
}

async function agilizacion (isRefresh) {
  try {
    if (isRefresh) {
      await driver.navigate().refresh()
    }
    await driver.wait(until.urlIs(urls.agilizacion), timeout)
    await waitLoading()
    await driver.findElement(By.name(elements.formPagoSubmit)).click()
    await formPago()
  } catch (err) {
    console.error(err)
    let url = await driver.getCurrentUrl()
    if (url !== urls.agilizacion) return invalidatedLogin()
    console.log('Retrying agilizacion...')
    return agilizacion(true)
  }
}

async function formPago () {
  try {
    await driver.wait(until.urlIs(urls.formPago), timeout)
    await notification.send('Ingreso al formulario de pago!!!')
  } catch (err) {
    console.error(err)
    let url = await driver.getCurrentUrl()
    if (url === urls.agilizacion) {
      console.info('Refreshing agilizacion and retrying form pago...')
      return agilizacion(false)
    }
    if (url !== urls.formPago) return invalidatedLogin()
    console.log('Retrying form pago...')
    return agilizacion(false)
  }
}

function invalidatedLogin () {
  console.info('Session lost, return to login')
  return login(true)
}

// driver.sleep(1000)
//   .then(() => {
//     driver.findElement(By.name('q').sendKeys(webdriver.Key.TAB))
//   })
//   .catch(console.error)

// driver.findElement(By.name('btnK')).click()
//   .catch(console.error)

// driver.sleep(2000)
//   .then(() => {
//     driver.getTitle().then(title => {
//       if (title === 'webdriver - Buscar con Google') {
//         console.log('Test passed')
//       } else {
//         console.log('Test failed')
//       }
//     })
//   })
//   .catch(console.error)

// driver.quit()
