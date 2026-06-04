const { test } = require('@playwright/test')

const { LoginingPage } = require('../pages/LoginPage.js')
const { Toast } = require('../pages/Components.js')

/** @type {import('../pages/LoginPage.js').LoginingPage} */

let loginingPage
let toast

test.beforeEach(async ({ page }) => {
  loginingPage = new LoginingPage(page)
  toast = new Toast(page)
  await loginingPage.visit()
})

test('deve logar com administrador', async () => {
   await loginingPage.submit('admin@zombieplus.com','pwd123')
   await loginingPage.isLoggedIn()
})

test('não deve logar com administrador', async () => {
   await loginingPage.submit('admin@zombieplus.com','pwd1234')

   const msg = "Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente."
   
   await toast.toasHaveText(msg)
    
   await loginingPage.isLoggedIn()
})

