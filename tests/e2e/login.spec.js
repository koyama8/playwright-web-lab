const { test } = require('@playwright/test')

const { LoginingPage } = require('../pages/LoginPage.js')

/** @type {import('../pages/LoginPage.js').LoginingPage} */

let loginingPage

test.beforeEach(async ({ page }) => {
  loginingPage = new LoginingPage(page)
  await loginingPage.visit()
})

test('deve logar com administrador', async () => {
   await loginingPage.submit('admin@zombieplus.com','pwd123')
   await loginingPage.isLoggedIn()
})