const { test: base, expect } = require('@playwright/test')

const { Login } = require('./actions/Login.js')
const { Movies } = require('./actions/Movies.js')
const { Popup } = require('./actions/Components.js')
const { request } = require('node:http')

const { Api } = require('./api')

const test = base.extend({
    page: async ({page}, use) => {

        const context = page

        context['login'] = new Login(page) 
        context['movies'] = new Movies(page) 
        context['popup'] = new Popup(page)     

        await use(context)
    },
    request: async({ request }, use) => {
      const context = request 
      
      context['api'] = new Api(request)

      await use(context)
    }
})

module.exports = { test, expect }
