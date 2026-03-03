import { faker } from "@faker-js/faker"


describe('POST /api/users/register', () => {
  it('Deve cadastrar um novo usuario', () => {

    const user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: 'katana123'
    }

    //cy.task('deleteUser', user.email)

    cy.api({
      method: 'POST',
      url: 'http://localhost:3333/api/users/register',
      body: user
    }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body.message).to.eq('User successfully created.')
      expect(response.body.user.id).to.match(/^[-]?\d+$/)
      expect(response.body.user.name).to.eq(user.name)
      expect(response.body.user.email).to.eq(user.email)
    })
  })

  it('Deve validar campo name no body', () => {

    const user = {
      email: faker.internet.email(),
      password: 'katana123'
    }
    cy.api({
      method: 'POST',
      url: 'http://localhost:3333/api/users/register',
      body: user,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq('ValidationError: The "name" field is required.')
    })
  })

  it('Deve validar campo email no body', () => {

    const user = {
      name: faker.person.fullName(),
      password: 'katana123'
    }
    cy.postUser(user)
      .then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.error).to.eq('ValidationError: The "email" field is required.')
      })
  })
  it('Deve validar campo password no body', () => {

    const user = {
      name: faker.person.fullName(),
      email: faker.internet.email()
    }
    cy.postUser(user)
      .then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.error).to.eq('ValidationError: The "password" field is required.')
      })
  })

  it('Deve validar usuario cadastrado', () => {

    const user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: 'katana123'
    }

    //cy.task('deleteUser', user.email)

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body.message).to.eq('User successfully created.')
      expect(response.body.user.id).to.match(/^[-]?\d+$/)
      expect(response.body.user.name).to.eq(user.name)
      expect(response.body.user.email).to.eq(user.email)
    })

    cy.postUser(user)
      .then((response) => {
        expect(response.status).to.eq(409)
        expect(response.body.error).to.eq('ConflictError: An account with this email already exists.')
      })
  })

  it('Deve validar JSON mal formado', () => {

    const user = `{
      name: faker.person.fullName(),
      email: faker.internet.email()
      password: 'katana123'
    }`

    cy.postUser(user)
      .then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.error).to.eq('Invalid JSON format.')
      })
  })
})