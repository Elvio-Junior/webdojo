describe('Validações de Alertas em Javascript', () => {

  beforeEach(() => {
    cy.login()
    cy.goToForm('Alertas JS', 'JavaScript Alerts')
  })

  it('Deve validar a mensagem de alerta', () => {

    cy.on('window:alert', (msg) => {
      expect(msg).to.equal('Olá QA, eu sou uma Alert Box!')
    })

    cy.contains('button', 'Mostrar Alert')
      .click()
  })

  it('Deve confirmar um dialogo e validar a resposta positiva', () => {
    cy.on('window:confirm', (msg) => {
      expect(msg).to.equal('Aperta um botão!')
      return true
    })

    cy.on('window:alert', (msg) => {
      expect(msg).to.equal('Você clicou em Ok!')
    })

    cy.contains('button', 'Mostrar Confirm')
      .click()
  })

  it('Deve cancelar um dialogo e validar a resposta negativa', () => {
    cy.on('window:confirm', (msg) => {
      expect(msg).to.equal('Aperta um botão!')
      return false
    })

    cy.on('window:alert', (msg) => {
      expect(msg).to.equal('Você cancelou!')
    })

    cy.contains('button', 'Mostrar Confirm')
      .click()
  })

  it('Deve interagir com prompt, inserir texto e validar uma mensagem', () => {
    cy.window().then((win) => {
      cy.stub(win, 'prompt')
        .returns('Fernando')
    })
    cy.on('window:alert', (msg) => {
      expect(msg).to.equal('Olá Fernando! Boas vindas ao WebDojo!')
    })

    cy.contains('button', 'Mostrar Prompt')
      .click()
  })
})