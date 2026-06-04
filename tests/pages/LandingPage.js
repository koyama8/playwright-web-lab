import { expect } from '@playwright/test';

export class LandingPage {
  constructor(page) {
    this.page = page;
    this.url = 'http://localhost:3000';

    this.openLeadModalButton = page.getByRole('button', {
      name: 'Aperte o play... se tiver coragem',
    });
    this.modal = page.getByTestId('modal');
    this.modalHeading = this.modal.getByRole('heading');
    this.nameInput = page.locator('input[name="name"]');
    this.emailInput = page.getByPlaceholder('Informe seu email');
    this.submitLeadButton = this.modal.getByText('Quero entrar na fila!');
    this.toast = page.locator('.toast');
    this.alert = page.locator('.alert');
  }

  async visit() {
    await this.page.goto(this.url);
  }

  async openLeadModel() {
    await this.openLeadModalButton.click();

    await expect(this.modalHeading).toHaveText('Fila de espera');
  }

  async submitLeadForm(name, email) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.submitLeadButton.click();
  }
  
  async alertHaveText(target) {
    await expect(this.alert).toHaveText(target);
  }
}
