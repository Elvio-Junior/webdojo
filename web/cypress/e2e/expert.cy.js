import _ from 'lodash'
import { faker } from '@faker-js/faker'

describe('Expert', () => {
    beforeEach(() => {
        cy.start()
    })

    it('Deve manipular os atributos de elementos do HTML', () => {
        cy.log('teste')

        cy.get('#email').invoke('val', 'papito@teste.com.br')

        cy.get('#password')
            .invoke('attr', 'type', 'text')
            .type('12345')

        cy.get('#password')
            .invoke('removeAttr', 'class')

        cy.contains('button', 'Entrar')
            .invoke('hide')
            .should('not.be.visible')

        cy.contains('button', 'Entrar')
            .invoke('show')
            .should('be.visible')

    })

    it('Não deve logar com senha invalida', () => {

        cy.submitLoginForm('papito@webdojo.com', 'katana')

        /*
        cy.wait(2500)

        cy.document()
            .then((doc) => {
                cy.writeFile('cypress/downloads/page.html', doc.documentElement.outerHTML)
            })
        */
        cy.get('[data-sonner-toaster=true] div[class=title]')
            .should('be.visible')
            .should('have.text', 'Acesso negado! Tente novamente.')

        cy.wait(5000)

        cy.get('[data-sonner-toaster=true] div[class=title]')
            .should('not.exist')
    })

    it('Não deve logar com senha invalida - Outra Forma', () => {

        cy.submitLoginForm('papito@webdojo.com', 'katana')

        cy.get('[data-sonner-toaster=true]')
            .should('be.visible')
            .as('toast')

        cy.get('@toast')
            .find('.title')
            .should('have.text', 'Acesso negado! Tente novamente.')

        cy.wait(5000)

        cy.get('@toast')
            .should('not.exist')
    })

    it.only('Simuladando a tecla TAB com cy.press', () => {
        cy.log('only')

        cy.get('body')
            .press('Tab')

        cy.focused()
            .should('have.attr', 'id', 'email')

        cy.get('#email')
            .press('Tab')

        cy.focused()
            .should('have.attr', 'id', 'password')

    })
    it('Utlizando a tecla ENTER', () => {

        cy.get('#email')
            .type('papito@webdojo.com{Enter}')

        cy.get('#passwrod')
            .type('kata{Enter}')

        cy.get('[data-sonner-toaster=true] div[class=title]')
            .should('be.visible')
            .should('have.text', 'Acesso negado! Tente novamente.')

        cy.wait(5000)

        cy.get('[data-sonner-toaster=true] div[class=title]')
            .should('not.exist')
    })

    it.only('Deve realizar uma carga de dados Fake', () => {

        _.times(5, () => {
            const name = faker.person.fullName()
            const email = faker.internet.email()
            const password = 'katana123'

            cy.log(name)
        })
    })
})