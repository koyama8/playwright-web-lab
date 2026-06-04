const { test } = require('@playwright/test')

const data = require('../support/fixtures/movies.json')

const { LoginingPage } = require('../pages/LoginPage.js')
const { Moviespage } = require('../pages/Moviespage.js')
const { Toast } = require('../pages/Components.js')

/** @type {import('../pages/Moviespage.js').Moviespage} */

let loginingPage
let moviespage
let toast

test.beforeEach(async ({ page }) => {
  loginingPage = new LoginingPage(page)
  toast = new Toast(page)
  moviespage = new Moviespage(page)
  await loginingPage.visit()
})
 
test('deve poder cadastrar um novo filme', async({page}) => {
    
    const movie = data.create

    await loginingPage.submit('admin@zombieplus.com','pwd123')
    await moviespage.isLoggedIn()

    await moviespage.create(movie.title, movie.overview, movie.company, movie.release_year)
    
})