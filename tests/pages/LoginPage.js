import { expect } from '@playwright/test';

export class LoginingPage {

    constructor(page) {
    this.page = page;
    this.url = 'http://localhost:3000/admin/login';
  }

 
  async visit() {
    await this.page.goto(this.url);
  }

}
