//Traz o dados do index.js
const { test, expect } = require('../support')

const data = require('../support/fixtures/movies.json')

const { executeSQL } = require('../support/databse.js')
 
test('deve poder cadastrar um novo filme', async({ page }) => {

    const movie = data.create
    await executeSQL(`DELETE from movies WHERE title = '${movie.title}';`)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

   await page.movies.create(
         movie.title,
         movie.overview,
         movie.company,
         movie.release_year,
         movie.featured
      )
    await page.popup.haveText(`O filme '${movie.title}' foi adicionado ao catálogo.`)   
})

test('não deve cadastrar quando o titulo é duplicado', async({ page, request }) => {

    const movie = data.duplicate
    await executeSQL(`DELETE from movies WHERE title = '${movie.title}';`)

    await request.api.postMovie(movie)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.movies.create(
         movie.title,
         movie.overview,
         movie.company,
         movie.release_year,
         movie.featured
      )

    await page.popup.haveText(`O título '${movie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`)
})
 
 test('não deve cadastrar quando os campos obrigatorios não são preenchidos', async({ page }) => {
  
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.movies.goForm()
    await page.movies.submit()

    await page.movies.toHaveText([
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório'
    ])
})


