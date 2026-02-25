import { getTodayDate } from "../support/utils"

describe('Login', () => {

  beforeEach(() => {
    cy.start()
  })


  it('Deve logar com sucesso', () => {
    /*
    cy.visit('http://localhost:3000')
    cy.get('#email').type('papito@webdojo.com')
    cy.get('#password').type('katana123')
    cy.contains('button', 'Entrar').click()
    */
    /*
     Cypress por padrão não tem suporte para XPATH
     XPATH
       Button => //button[text()="Entrar"]
    */
    cy.submitLoginForm('papito@webdojo.com', 'katana123')

    cy.get('[data-cy="user-name"]')
      .should('be.visible')
      .and('have.text', 'Fernando Papito')

    cy.get('[data-cy="welcome-message"]')
      .should('be.visible')
      .and('have.text', 'Olá QA, esse é o seu Dojo para aprender Automação de Testes.')

    cy.getCookie('login_date')
      .should('exist')

    cy.getCookie('login_date')
      .should((cookie) => {
        expect(cookie.value).to.eq(getTodayDate())
      })

    cy.window().then((win) => {
      const token = win.localStorage.getItem('token')
      expect(token).to.match(/^[a-fA-F0-9]{32}$/)
    })

  })

  it('Não deve logar com senha invalida', () => {
    /*
    cy.visit('http://localhost:3000')
    cy.get('#email').type('papito@webdojo.com')
    cy.get('#password').type('katana')
    cy.contains('button', 'Entrar').click()
    */
    cy.submitLoginForm('papito@webdojo.com', 'katana')

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')
  })

  it('Não deve logar com email não cadastrado', () => {
    /*
    cy.visit('http://localhost:3000')
    cy.get('#email').type('404@webdojo.com')
    cy.get('#password').type('katana123')
    cy.contains('button', 'Entrar').click()
    */

    cy.submitLoginForm('404@webdojo.com', 'katana123')

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')
  })
})