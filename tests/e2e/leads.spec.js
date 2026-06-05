// @ts-check
import { expect, test } from '@playwright/test'
const { faker } = require('@faker-js/faker');

const { Leads } = require('../actions/Leads.js')
const { Toast } = require('../actions/Components.js')


/** @type {import('../actions/Leads.js').Leads} */
let landingPage

/** @type {import('../actions/Components.js').Toast} */
let toast

test.beforeEach(async ({ page }) => {
  landingPage = new Leads(page)
  toast = new Toast(page)
  await landingPage.visit()
  await landingPage.openLeadModel()
})

test('deve cadastrar um lead na fila de espera', async () => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  await landingPage.visit()
  await landingPage.openLeadModel()
  await landingPage.submitLeadForm(leadName, leadEmail)

  const msg = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await toast.toasHaveText(msg)
})

test('não deve cadastrar quando o email ja existe', async ({page, request}) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()
  
  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: leadName,
      email: leadEmail
    }
  })
  //Retorno do statusCode da API
  expect(newLead.ok()).toBeTruthy()

  await landingPage.visit()
  await landingPage.openLeadModel()
  await landingPage.submitLeadForm(leadName, leadEmail)


  const msg = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'
  await toast.toasHaveText(msg)
})


test('nao deve cadastrar quando o email e incorreto', async () => {
  await landingPage.submitLeadForm('Matheus', 'qalab.com')

  await landingPage.alertHaveText('Email incorreto')
})

test('nao deve cadastrar quando o nome nao e preenchido', async () => {
  await landingPage.submitLeadForm('', 'qalab@hotmail.com')

  await landingPage.alertHaveText('Campo obrigatório')
})

test('nao deve cadastrar quando o email nao e preenchido', async () => {
  await landingPage.submitLeadForm('Matheus', '')

  await landingPage.alertHaveText('Campo obrigatório')
})

test('nao deve cadastrar quando o nome e email nao sao preenchidos', async () => {
  await landingPage.submitLeadForm('', '')

  await landingPage.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório',
  ])
})
