import _ from 'lodash'
import { faker } from '@faker-js/faker'

describe('Cadastro', () => {

  beforeEach(() => {
    cy.goToSignup()

    cy.intercept('POST', 'http://localhost:3333/api/users/register', {
      statusCode: 201,
      body: {
        message: "Usuario cadastrado com sucesso"
      }
    }).as('postSigunup')

  })

  it('Deve cadastrar um novo usuario', () => {

    cy.get('#name')
      .type('Fernando Papito')

    cy.get('#email')
      .type('papito@teste.com.br')

    cy.get('#password')
      .type('katana123')

    cy.contains('button', 'Criar conta')
      .click()

    //cy.wait('@postSigunup')

    cy.contains('Conta criada com sucesso!')
      .should('be.visible')
  })

  _.times(5, () => {
    it('Deve cadastrar varios usuarios', () => {


      const name = faker.person.fullName()
      const email = faker.internet.email()
      const password = 'katana123'

      cy.get('#name')
        .type(name)

      cy.get('#email')
        .type(email)

      cy.get('#password')
        .type(password)

      cy.contains('button', 'Criar conta')
        .click()

      cy.wait('@postSigunup')

      cy.contains('Conta criada com sucesso!')
        .should('be.visible')
    })
  })

})