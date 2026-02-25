import { personal, company } from '../fixtures/consultancy.json'

describe('Formulario de Consultoria', () => {

  before(() => {
    cy.log('Isso acontence antes de todos os testes uma unica vez')
  })

  beforeEach(() => {
    /*
    cy.start()
    cy.submitLoginForm('papito@webdojo.com', 'katana123')
    */
    cy.login()
    cy.goToForm('Formulários', 'Consultoria')
    //cy.fixture('consultancy').as('consultancyData')

  })
  it('Deve solicitar consultoria individual', () => {

    /* Busca do Elemento Button
    cy.contains('h4', 'Formulários')
      .parent()
      .parent()
      .parent()
      .should('be.visible')
    // Cypress busca texto nos elementos filhos
    cy.contains('button', 'Formulários')
      .should('be.visible')
      .click()
    */

    /* Alternativa quando não tem id no campo de Input
    cy.get('input[placeholder="Digite seu nome completo"]').type('Nome')
    cy.get('input[placeholder="Digite seu email"]').type('email')
    cy.get('input[placeholder="(00) 00000-0000"]').type('16 9999-9999')
    cy.get('input[placeholder="000.000.000-00"]').type('12345678900')
    cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]).type('lorem')
    cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]').type('Cypress').type('{enter}')
    */

    /* Caixa de Opção => Navegador mostra as opções
    cy.get('#consultancyType').select('In Company') => text
    cy.get('#consultancyType').select('inCompany') => value
    cy.get('#consultancyType').select('inCompany')
    cy.contains('label', 'Tipo de Consultoria')
      .parent()
      .find('select')
      .select('In Company')
    */

    /* Botão de Radio
    cy.contains('span', 'Pessoa Jurídica')
      .parent()
      .find('input')
      .check()  
    */
    /*
    Cypress por padrão não tem suporte para XPATH
    XPATH
      Button => //h4[text()="Formulários"]/../../..
      Select => //label[text()="Tipo de Consultoria"]/..//select
      Radio => //span[text()="Pessoa Fisica"]/..//input
    */
    /* 
    cy.contains('label', 'CPF')
       .parent()
       .find('input')
       .type('76986668082')
       .should('have.value','769.866.680-82')
    */

    /*
    cy.submitLoginForm('papito@webdojo.com', 'katana123')

    cy.goToForm('Formulários', 'Consultoria')
    */
    /*
    const consultancyForm = {
      name: 'Fernando Papito',
      email: 'papito@webdojo.com',
      phone: '11 99999-1111',
      consultancyType: 'individual',
      personType: 'CPF',
      document: '76986668082',
      discoveryChannels: [
        'Instagram',
        'LinkedIn',
        'Udemy',
        'YouTube',
        'Indicação de Amigo'
      ],
      file: './cypress/fixtures/lorem-ipsum.pdf',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
      techs: [
        'Cypress',
        'Selenium',
        'WebDriveIO',
        'Playwright',
        'Robot Framework'
      ],
      terms: true
    }
    */

    //const consultancyForm = this.consultancyData.personal

    //cy.get('#name').type('Fernando Papito')
    cy.get('#name').type(personal.name)
    //cy.get('#email').type('papito@webdojo.com')
    cy.get('#email').type(personal.email)
    cy.get('#phone')
      .type(personal.phone)
    //.type('11 99999-1111')
    //.should('have.value', '(11) 99999-1111')

    //cy.get('#consultancyType').select('individual')
    cy.get('#consultancyType').select(personal.consultancyType)

    if (personal.personType === 'CPF') {
      cy.contains('label', 'Pessoa Física')
        .find('input')
        .check()
        .should('be.checked')

      cy.contains('label', 'Pessoa Jurídica')
        .find('input')
        .should('be.not.checked')

    }
    if (personal.personType === 'CNPJ') {
      cy.contains('label', 'Pessoa Jurídica')
        .find('input')
        .check()
        .should('be.checked')

      cy.contains('label', 'Pessoa Física')
        .find('input')
        .should('be.not.checked')
    }

    cy.contains('label', 'CPF')
      .type(personal.document)
    //.type('76986668082')
    //.should('have.value', '769.866.680-82')

    const discoveryChannels = [
      'Instagram',
      'LinkedIn',
      'Udemy',
      'YouTube',
      'Indicação de Amigo'
    ]
    personal.discoveryChannels.forEach((channel) => {
      cy.contains('label', channel)
        .find('input')
        .check()
        .should('be.checked')

    })

    cy.get('input[type="file"]')
      //.selectFile('./cypress/fixtures/lorem-ipsum.pdf', { force: true })
      .selectFile(personal.file, { force: true })

    const textArea = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

    cy.get('#details')
      //.type(textArea)
      .type(personal.description)

    const techs = [
      'Cypress',
      'Selenium',
      'WebDriveIO',
      'Playwright',
      'Robot Framework'
    ]

    personal.techs.forEach((tech) => {
      cy.get('#technologies')
        .type(tech)
        .type('{enter}')

      cy.contains('label', 'Tecnologias')
        .parent()
        .contains('span', tech)
        .should('be.visible')
    })

    if (personal.terms === true) {
      cy.contains('label', 'termos de uso')
        .find('input')
        .check()
    }

    cy.contains('button', 'Enviar formulário')
      .click()

    cy.get('.modal', { timeout: 7000 })
      .should('be.visible')
      .find('.modal-content')
      .should('be.visible')
      .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
    /*
    cy.contains('Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
      .should('be.visible')
    */
  })
  it('Deve solicitar consultoria In Company', () => {

    /*
    cy.submitLoginForm('papito@webdojo.com', 'katana123')

    cy.goToForm('Formulários', 'Consultoria')
    */
    const consultancyForm = {
      name: 'Fernando Papito',
      email: 'papito@webdojo.com',
      phone: '11 99999-1111',
      consultancyType: 'In Company',
      personType: 'CNPJ',
      document: '12366739000109',
      discoveryChannels: [
        'LinkedIn',
      ],
      file: './cypress/fixtures/lorem-ipsum.pdf',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
      techs: [
        'Cypress',
        'Selenium',
        'WebDriveIO',
        'Playwright',
        'Robot Framework'
      ],
      terms: true
    }

    cy.get('#name').type(company.name)
    cy.get('#email').type(company.email)
    cy.get('#phone')
      .type(company.phone)
    //.should('have.value', '(11) 99999-1111')

    cy.get('#consultancyType').select(company.consultancyType)

    if (company.personType === 'CNPJ') {
      cy.contains('label', 'Pessoa Física')
        .find('input')
        .check()
        .should('be.checked')

      cy.contains('label', 'Pessoa Jurídica')
        .find('input')
        .should('be.not.checked')

    }
    if (company.personType === 'CNPJ') {
      cy.contains('label', 'Pessoa Jurídica')
        .find('input')
        .check()
        .should('be.checked')

      cy.contains('label', 'Pessoa Física')
        .find('input')
        .should('be.not.checked')
    }

    cy.contains('label', 'CNPJ')
      .type(company.document)
    //.should('have.value', '123.667.390-00109')

    company.discoveryChannels.forEach((channel) => {
      cy.contains('label', channel)
        .find('input')
        .check()
        .should('be.checked')

    })

    cy.get('input[type="file"]')
      .selectFile(company.file, { force: true })

    cy.get('#details')
      .type(company.description)

    company.techs.forEach((tech) => {
      cy.get('#technologies')
        .type(tech)
        .type('{enter}')

      cy.contains('label', 'Tecnologias')
        .parent()
        .contains('span', tech)
        .should('be.visible')
    })

    if (company.terms === true) {
      cy.contains('label', 'termos de uso')
        .find('input')
        .check()
    }

    cy.contains('button', 'Enviar formulário')
      .click()

    cy.get('.modal', { timeout: 7000 })
      .should('be.visible')
      .find('.modal-content')
      .should('be.visible')
      .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
  })

  it('Deve solicitar consultoria individual - Custom Commands', () => {

    cy.fillConsultancyForm(personal)

    cy.submitConsultancyForm()

    cy.validateConsultancyModal()
  })
  it('Deve solicitar consultoria In Company  - Custom Commands', () => {

    cy.fillConsultancyForm(company)

    cy.submitConsultancyForm()

    cy.validateConsultancyModal()

  })

  it('Deve validar campos obrigatórios', () => {
    /*
    XPATH
    //label[text()="Nome Completo"]/..//p
    */
    /*
     cy.submitLoginForm('papito@webdojo.com', 'katana123')
 
     cy.goToForm('Formulários', 'Consultoria')
     */
    cy.contains('button', 'Enviar formulário')
      .click()
    /*
    cy.contains('p', 'Digite nome e sobrenome')
      .should('be.visible')
      .and('have.class', 'text-red-400')
      .and('have.css', 'color', 'rgb(248, 113, 113)')

    cy.contains('p', 'Informe um email válido')
      .should('be.visible')
      .and('have.class', 'text-red-400')
      .and('have.css', 'color', 'rgb(248, 113, 113)')

    cy.contains('p', 'Você precisa aceitar os termos de uso')
      .should('be.visible')
      .and('have.class', 'text-red-400')
      .and('have.css', 'color', 'rgb(248, 113, 113)')
    */
    cy.contains('label', 'Nome Completo')
      .parent()
      .find('p')
      .should('have.text', 'Campo obrigatório')
      .and('have.class', 'text-red-400')
      .and('have.css', 'color', 'rgb(248, 113, 113)')

    cy.contains('label', 'Email')
      .parent()
      .find('p')
      .should('have.text', 'Campo obrigatório')
      .and('have.class', 'text-red-400')
      .and('have.css', 'color', 'rgb(248, 113, 113)')

    cy.contains('label', 'termos de uso')
      .parent()
      .find('p')
      .should('have.text', 'Você precisa aceitar os termos de uso')
      .and('have.class', 'text-red-400')
      .and('have.css', 'color', 'rgb(248, 113, 113)')
  })

  it('Deve validar campos obrigatórios - Refactor', () => {

    cy.contains('button', 'Enviar formulário')
      .click()

    const requiredFields = [
      { label: 'Nome Completo', message: 'Campo obrigatório' },
      { label: 'Email', message: 'Campo obrigatório' },
      { label: 'termos de uso', message: 'Você precisa aceitar os termos de uso' }
    ]

    requiredFields.forEach(({ label, message }) => {
      cy.contains('label', label)
        .parent()
        .find('p')
        .should('have.text', message)
        .and('have.class', 'text-red-400')
        .and('have.css', 'color', 'rgb(248, 113, 113)')

    })
  })

  afterEach(() => {
    cy.log('Isso acontece depois de cada teste')
  })

  after(() => {
    cy.log('Isso acontence depois de todos os testes uma unica vez')
  })
})