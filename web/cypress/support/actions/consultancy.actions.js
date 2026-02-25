Cypress.Commands.add('fillConsultancyForm', (form) => {
  cy.get('#name').type(form.name)
  cy.get('#email').type(form.email)
  cy.get('#phone')
    .type(form.phone)
  //.should('have.value', '(11) 99999-1111')

  cy.get('#consultancyType').select(form.consultancyType)

  if (form.personType === 'CNPJ') {
    cy.contains('label', 'Pessoa Física')
      .find('input')
      .check()
      .should('be.checked')

    cy.contains('label', 'Pessoa Jurídica')
      .find('input')
      .should('be.not.checked')

    cy.contains('label', 'CPF')
      .type(form.document)
    //.should('have.value', '123.667.390-00109')
  }

  if (form.personType === 'CNPJ') {
    cy.contains('label', 'Pessoa Jurídica')
      .find('input')
      .check()
      .should('be.checked')

    cy.contains('label', 'Pessoa Física')
      .find('input')
      .should('be.not.checked')

    cy.contains('label', 'CNPJ')
      .type(form.document)
    //.should('have.value', '123.667.390-00109')
  }

  form.discoveryChannels.forEach((channel) => {
    cy.contains('label', channel)
      .find('input')
      .check()
      .should('be.checked')
  })

  cy.get('input[type="file"]')
    .selectFile(form.file, { force: true })

  cy.get('#details')
    .type(form.description)

  form.techs.forEach((tech) => {
    cy.get('#technologies')
      .type(tech)
      .type('{enter}')

    cy.contains('label', 'Tecnologias')
      .parent()
      .contains('span', tech)
      .should('be.visible')
  })

  if (form.terms === true) {
    cy.contains('label', 'termos de uso')
      .find('input')
      .check()
  }

})

Cypress.Commands.add('submitConsultancyForm', () => {
  cy.contains('button', 'Enviar formulário')
    .click()
})

Cypress.Commands.add('validateConsultancyModal', () => {
  cy.get('.modal', { timeout: 7000 })
    .should('be.visible')
    .find('.modal-content')
    .should('be.visible')
    .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
})