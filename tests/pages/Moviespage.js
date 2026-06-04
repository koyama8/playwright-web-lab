import { test, expect } from '@playwright/test';

export class Moviespage {
    
     constructor(page){
        this.page= page
    }

      async isLoggedIn(){
        //Espera os dados da tela carrega e em seguida verifica a url se possui admin
        await this.page.waitForLoadState('networkidle')
        await expect(this.page).toHaveURL(/.*admin/)
      }
    
}