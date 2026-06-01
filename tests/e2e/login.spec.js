const{ test, expect } = require('@playwright/test')

const { LoginingPage } = require('../pages/LoginPage.js')

/** @type {import('../pages/LoginPage.js').LoginPage} */

let loginingPage  

test.beforeEach(async ({ page }) => {
  loginingPage = new LoginingPage(page)
  await loginingPage.visit()
})

test('deve logar com administrador', async ({page}) => {

    
    //const loginform = page.locator('.login-form')
   // await expect(loginform).toBeVisible()
})
