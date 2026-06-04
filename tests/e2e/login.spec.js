const { test } = require('@playwright/test')

const { LoginingPage } = require('../pages/LoginPage.js')
const  { Moviespage } = require('../pages/Moviespage.js')
const { Toast } = require('../pages/Components.js')

/** @type {import('../pages/LoginPage.js').LoginingPage} */

let loginingPage
let toast
let moviespage

test.beforeEach(async ({ page }) => {
  loginingPage = new LoginingPage(page)
  toast = new Toast(page)
  moviespage = new Moviespage(page)
  await loginingPage.visit()
})

test('deve logar com administrador', async () => {
   await loginingPage.submit('admin@zombieplus.com','pwd123')
   await moviespage.isLoggedIn()
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


