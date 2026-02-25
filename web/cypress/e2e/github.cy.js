describe('Gerenciamento de Perfis no Github', () => {
    beforeEach(() => {
        cy.login()
        cy.goToForm('Tabela', 'Perfis do GitHub')
    })

    it('Deve poder cadastrar um novo perfil no Github', () => {
        cy.get('#name')
            .type('Fernando Papito')
        cy.get('#username')
            .type('papitodev')
        cy.get('#profile')
            .type('QA')
        cy.contains('button', 'Adicionar Perfil')
            .click()

        cy.contains('table tbody tr', 'papitodev')
            .should('be.visible')
            .as('trProfile')

        cy.get('@trProfile')
            .contains('td', 'Fernando Papito')
            .should('be.visible')

        cy.get('@trProfile')
            .contains('td', 'QA')
            .should('be.visible')

        /*
        cy.contains('table tbody tr', 'Fernando Papito')
            .should('be.visible')
        cy.contains('table tbody tr', 'papitodev')
            .should('be.visible')
        cy.contains('table tbody tr', 'QA')
            .should('be.visible')
        */
    })

    it('Deve poder remover um perfil no Github', () => {

        const profile = {
            name: 'Fernando Papito',
            userName: 'papito123',
            desc: 'QA'
        }
        cy.get('#name')
            .type(profile.name)
        cy.get('#username')
            .type(profile.userName)
        cy.get('#profile')
            .type(profile.desc)
        cy.contains('button', 'Adicionar Perfil')
            .click()

        cy.contains('table tbody tr', profile.userName)
            .should('be.visible')
            .as('trProfile')

        //button[title="Remover Perfil"]
        cy.get('@trProfile')
            .find('button[title="Remover perfil"]')
            .click()

        cy.contains('table tbody', profile.userName)
            .should('not.exist')
    })

    it('Deve validar o link do Github', () => {

        const profile = {
            name: 'Fernando Papito',
            userName: 'papitodev',
            desc: 'QA'
        }
        cy.get('#name')
            .type(profile.name)
        cy.get('#username')
            .type(profile.userName)
        cy.get('#profile')
            .type(profile.desc)
        cy.contains('button', 'Adicionar Perfil')
            .click()

        cy.contains('table tbody tr', profile.userName)
            .should('be.visible')
            .as('trProfile')

        cy.get('@trProfile')
            .find('a')
            .should('have.attr', 'href', 'https://github.com/' + profile.userName)
            .and('have.attr', 'target', '_blank')
    })
})