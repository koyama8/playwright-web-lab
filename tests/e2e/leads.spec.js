// @ts-check
import { test } from '@playwright/test'
const { LandingPage } = require('../pages/LandingPage.js')
const { Toast } = require('../pages/Components.js')


/** @type {import('../pages/LandingPage.js').LandingPage} */
let landingPage

/** @type {import('../pages/Components.js').Toast} */
let toast

test.beforeEach(async ({ page }) => {
  landingPage = new LandingPage(page)
  toast = new Toast(page)
  await landingPage.visit()
  await landingPage.openLeadModel()
})

test('deve cadastrar um lead na fila de espera', async () => {
  await landingPage.submitLeadForm('Matheus', 'qalab@hotmail.com')

  const msg = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
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
