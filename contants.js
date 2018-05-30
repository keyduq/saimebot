module.exports = {
  credentials: {
    user: 'user@mail.com',
    pwd: 'password'
  },
  urls: {
    login: 'https://tramites.saime.gob.ve/index.php?r=site/login',
    tramite: 'https://tramites.saime.gob.ve/index.php?r=tramite/tramite/',
    agilizacion: 'https://tramites.saime.gob.ve/index.php?r=inicio/inicio/agilizacion',
    formPago: 'https://tramites.saime.gob.ve/index.php?r=pago/pago/formpago'
  },
  elements: {
    loginSubmit: 'yt0',
    loginFormUsername: 'LoginForm[username]',
    loginFormPassword: 'LoginForm[password]',
    formPagoSubmit: 'yt0'
  },
  timeout: 120000,
  telegram: {
    token: '572860642:AAGzW-t4n944KqfLeEQXXAMk5Q7s_QUCo8s',
    chatId: '@SAlertExpress'
  }
}
