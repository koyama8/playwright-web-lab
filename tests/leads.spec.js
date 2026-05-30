// @ts-check
import { test } from '@playwright/test';

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  await page.goto('http://localhost:3000');

  //await page.click('//button[text()="Aperte o play... se tiver coragem"]')  
  await page.getByRole('button', {name: 'Aperte o play... se tiver coragem'}).click()
  await page.waitForTimeout(3000);
});
