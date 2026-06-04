import { test, expect } from '@playwright/test';

export class LoginingPage {
  
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
    this.page = page;
    this.url = 'http://localhost:3000/admin/login';
  }

 
  async visit() {
    await this.page.goto(this.url);
    
    const loginform = this.page.locator('.login-form')
    await expect(loginform).toBeVisible()
  }

  async submit(email,senha){
    await this.page.getByPlaceholder('E-mail').fill(email)
    await this.page.getByPlaceholder('Senha').fill(senha)

    await this.page.locator('//button[text()="Entrar"]').click()
  }
  async alertHaveText(text){
    const alert = this.page.locator('span[class$=alert]')
    await expect(alert).toHaveText(text)
  }

  async alertHaveTextpassword(text){
    const alert = this.page.locator('.password-alert')
    await expect(alert).toHaveText(text)
  }

}
