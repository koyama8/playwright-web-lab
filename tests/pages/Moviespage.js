import { test, expect } from '@playwright/test';
                 
       /**
 * Captura o HTML atual da página para análise no console.
 * Útil para identificar seletores específicos que não foram encontrados durante a execução.
 *
 * const html = await this.page.content();
 * console.log(html);
 */
export class Moviespage {
    
     /** @param {import('@playwright/test').Page} page */
     constructor(page){
        this.page= page
    }

      async isLoggedIn(){
        //Espera os dados da tela carrega e em seguida verifica a url se possui admin
        await this.page.waitForLoadState('networkidle')
        await expect(this.page).toHaveURL(/.*admin/)
      }

     async create(title,overview,company,release_year){
      // Seletor com reger o mesmo que a[href="/admin/movies/register"]
       await this.page.locator('a[href$="register"]').click()

       await this.page.getByLabel('Titulo do filme').fill(title)
       await this.page.getByLabel('Sinopse').fill(overview)

       await this.page.locator('#select_company_id  .react-select__indicator')
                 .click()

       await this.page.locator('.react-select__option').filter({hasText: company})
                 .click()

       await this.page.locator('#select_year .react-select__indicator').click()   
      
       await this.page.locator('.react-select__option').filter({hasText: release_year})
                 .click()
       
       await this.page.getByRole('button', {name: 'Cadastrar'})
                 .click()
     }
    
}