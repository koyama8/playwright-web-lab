import { test, expect } from '@playwright/test';

export class Toast {
   
    constructor(page){
        this.page= page
    }

  async toasHaveText(msg) {
    const toast = this.page.locator('.toast')
    await expect(toast).toHaveText(msg)

    await this.page.waitForTimeout(3000);
  }

  async containText(msg) {
    const toast = this.page.locator('.locator')
    await expect(toast).containText(msg)
       
    await this.page.waitForTimeout(3000);

  }
}