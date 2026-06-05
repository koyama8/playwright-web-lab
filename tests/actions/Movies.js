import { test, expect } from '@playwright/test';
                 
       /**
 * Captura o HTML atual da página para análise no console.
 * Útil para identificar seletores específicos que não foram encontrados durante a execução.
 *
 * const html = await this.page.content();
 * console.log(html);
 */
export class Movies {
    
     /** @param {import('@playwright/test').Page} page */
     constructor(page){
        this.page= page
    }

     async goForm(){
        // Seletor com reger o mesmo que a[href="/admin/movies/register"]
       await this.page.locator('a[href$="register"]').click()
     }

     async submit(){      
       await this.page.getByRole('button', {name: 'Cadastrar'})
                 .click()
     }

     async toHaveText(text){
      
      await expect(this.page.locator('.alert')).toHaveText(text)
     }

     async create(title,overview,company,release_year){

       await this.goForm()

       await this.page.getByLabel('Titulo do filme').fill(title)
       await this.page.getByLabel('Sinopse').fill(overview)

       await this.page.locator('#select_company_id  .react-select__indicator')
                 .click()

       await this.page.locator('.react-select__option').filter({hasText: company})
                 .click()

       await this.page.locator('#select_year .react-select__indicator').click()   
      
       await this.page.locator('.react-select__option').filter({hasText: release_year})
                 .click()
 
       await this.submit()
     }
    
}