import address from '../fixtures/cep.json'

describe('CEP', () => {

  beforeEach(() => {
    cy.login()
    cy.goToForm('Integração', 'Consulta de CEP')
  })

  it('Deve validar a consulta de CEP', () => {
    cy.intercept('GET', `https://viacep.com.br/ws/${address.cep}/json/`, {
      statusCode: 200,
      body: {
        "cep": address.cep,
        "logradouro": address.street,
        "complemento": "",
        "unidade": "",
        "bairro": address.neighborhood,
        "localidade": address.city,
        "uf": address.state,
        "estado": "São Paulo",
        "regiao": "Sudeste",
        "ibge": "3516200",
        "gia": "3104",
        "ddd": "16",
        "siafi": "6425"
      },
    }).as('getCEp')

    cy.get('#cep')
      .type(address.cep)

    cy.contains('button', 'Buscar')
      .click()

    cy.wait('@getCEp')

    cy.get('#street')
      .should('have.value', address.street)

    cy.get('#neighborhood')
      .should('have.value', address.neighborhood)

    cy.get('#city')
      .should('have.value', address.city)

    cy.get('#state')
      .should('have.value', address.state)
  })

})