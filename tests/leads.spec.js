// @ts-check
import { test, expect} from '@playwright/test';

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  await page.goto('http://localhost:3000');

  //await page.click('//button[text()="Aperte o play... se tiver coragem"]')  
  await page.getByRole('button', {name: 'Aperte o play... se tiver coragem'}).click()

  //checkpoint verificar se esta na tela certa
  await expect(
    page.getByTestId('modal').getByRole('heading')
   ).toHaveText('Fila de espera')

  await page.locator('input[name="name"]').fill('Matheus')
  await page.getByPlaceholder('Seu email principal').fill('qalab@hotmail.com')

 
  await page.waitForTimeout(3000);

});
