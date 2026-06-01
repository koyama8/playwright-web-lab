import {expect} from '@playwright/test';

export class LandingPage {

    constructor(page){
        this.page = page
    }

    async visit() {
      await this.page.goto('http://localhost:3000');
    }

    async openLeadModel(){
        
      await this.page.getByRole('button', {name: 'Aperte o play... se tiver coragem'}).click()

      await expect(
      this.page.getByTestId('modal').getByRole('heading')
      ).toHaveText('Fila de espera')
    }

    async submitLeadForm(name, email){
     await this.page.locator('input[name="name"]').fill(name)
     await this.page.getByPlaceholder('Informe seu email').fill(email)
   
     await this.page.getByTestId('modal')
          .getByText('Quero entrar na fila!').click()
       
    }

    async toasHaveText(msg){        
          await expect(this.page.locator('.toast')).toHaveText(msg )
        
          await this.page.waitForTimeout(3000);
        
    }

    async alertHaveText(target){
        await expect(this.page.locator('.alert')).toHaveText(target)
    }
}