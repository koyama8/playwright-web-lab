const { expect } = require('@playwright/test')

// Classe de apoio para fazer chamadas diretamente na API do ZombiePlus.
// A ideia é preparar massa de dados pelo back-end antes de validar pela tela.
export class Api {

  constructor(request) {
    // "request" é a fixture de API do Playwright.
    // Com ela conseguimos fazer GET, POST, DELETE etc. sem abrir o navegador.
    this.request = request

    // O token começa vazio.
    // Depois do login via API, guardamos aqui o token de autenticação.
    this.token = undefined
  }

  async setToken() {
    // Faz login pela API para obter o token.
    // Endpoint chamado: POST /sessions
    const response = await this.request.post('http://localhost:3333/sessions', {
      data: {
        email: 'admin@zombieplus.com',
        password: 'pwd123',
      },
    })

    // Valida se a API respondeu com sucesso.
    expect(response.ok()).toBeTruthy()

    // A resposta vem em formato JSON.
    // Aqui transformamos o texto da resposta em objeto JavaScript.
    const body = JSON.parse(await response.text())

    // A API espera o token no formato:
    // Authorization: Bearer token_aqui
    this.token = 'Bearer ' + body.token
  }

  async postMovie(movie) {
    // O fixture tem o nome da empresa, mas a API precisa do ID da empresa.
    // Por isso primeiro buscamos o company_id pelo nome.
    const companyId = await this.getCompanyIdByName(movie.company)

    // Cria um filme diretamente pela API.
    // Endpoint chamado: POST /movies
    const response = await this.request.post('http://localhost:3333/movies', {
      headers: {
        // Envia o token no header Authorization.
        // Esse header prova para a API que o usuário está autenticado.
        Authorization: this.token
      },
      multipart: {
        // multipart simula o envio de um formulário.
        // Esse formato também permite enviar arquivos, como uma capa.
        title: movie.title,
        overview: movie.overview,
        company_id: companyId,
        release_year: movie.release_year,
        featured: movie.featured
      }
    })

    // Valida se o cadastro do filme foi aceito pela API.
    expect(response.ok()).toBeTruthy()
  }

  async getCompanyIdByName(companyName) {
    // Antes de consultar empresas, fazemos login e pegamos o token.
    // A rota /companies é protegida e precisa de autenticação.
    await this.setToken()

    // Busca uma empresa pelo nome.
    // Endpoint chamado: GET /companies?name=NomeDaEmpresa
    const response = await this.request.get('http://localhost:3333/companies', {
      headers: {
        // Token usado para autorizar a requisição.
        Authorization: this.token
      },
      params: {
        // params monta a query string da URL.
        // Exemplo: { name: 'Netflix' } vira /companies?name=Netflix
        name: companyName
      }
    })

    // Valida se a busca da empresa deu certo.
    expect(response.ok()).toBeTruthy()

    // Converte a resposta da API para objeto JavaScript.
    const body = JSON.parse(await response.text())

    // A API retorna uma lista dentro de body.data.
    // Pegamos o primeiro item encontrado e retornamos apenas o ID.
    return body.data[0].id
  }
}