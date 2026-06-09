import { test, expect } from '@playwright/test';

export class Popup {
   
    constructor(page){
        this.page= page
    }
    
// Quando uma ação dispara mais de um toast, pegamos o que contém a mensagem esperada
  async haveText(msg) {
    const element = this.page.locator('.swal2-html-container').filter({ hasText: msg }).last()
    await expect(element).toHaveText(msg)
  }

  async containText(msg) {
    const element = this.page.locator('.toast').filter({ hasText: msg }).last()
    await expect(element).toContainText(msg)
       
    await this.page.waitForTimeout(3000);

  }

}
