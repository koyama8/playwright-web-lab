const { test } = require('@playwright/test')

const { Login } = require('../support/actions/Login.js')
const { Popup } = require('../support/actions/Components.js')

/** @type {import('../support/actions/Login.js').Login} */

let loginingPage
let popup

test.beforeEach(async ({ page }) => {
  loginingPage = new Login(page)
  popup = new Popup(page)
  await loginingPage.visit()
})

test('deve logar com administrador', async () => {
   await loginingPage.submit('admin@zombieplus.com','pwd123')
   await loginingPage.isLoggedIn('Admin')
})

test('não deve logar com senha incorreta', async () => {
   await loginingPage.submit('admin@zombieplus.com','pwd1234')
  
   const msg = "Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente."
   
   await popup.haveText(msg)
    
})


test('não deve logar quando o email não é preenchido', async () => {
   await loginingPage.submit(' ','pwd1234')
  
   const msg = "Email incorreto"
   
   await loginingPage.alertHaveText(msg)

})

test('não deve logar quando a senha não é preenchida', async () => {
   await loginingPage.submit('qalab@hotmail.com','')
  
   const msg = "Campo obrigatório"
   
   await loginingPage.alertHaveTextpassword(msg)
    
})


