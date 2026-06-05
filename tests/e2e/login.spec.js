const { test } = require('@playwright/test')

const { Login } = require('../actions/Login.js')
const { Toast } = require('../actions/Components.js')

/** @type {import('../actions/Login.js').Login} */

let loginingPage
let toast

test.beforeEach(async ({ page }) => {
  loginingPage = new Login(page)
  toast = new Toast(page)
  await loginingPage.visit()
})

test('deve logar com administrador', async () => {
   await loginingPage.submit('admin@zombieplus.com','pwd123')
   await loginingPage.isLoggedIn('Admin')
})

test('não deve logar com senha incorreta', async () => {
   await loginingPage.submit('admin@zombieplus.com','pwd1234')
  
   const msg = "Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente."
   
   await toast.toasHaveText(msg)
    
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


