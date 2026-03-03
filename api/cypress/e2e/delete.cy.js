describe('DELETE /api/users/:id', () => {

  context('Delete User', () => {
    let userID

    const originalUser = {
      name: "Peter Parker",
      email: "batman@justiceleague.com",
      password: "katana123"
    }

    beforeEach(() => {
      cy.postUser(originalUser)
        .then((response => {
          userID = response.body.user.id
        }))
    })

    after(() => {

    })
    it('Deve remover um usuario', () => {

      cy.deleteUser(userID)
        .then(response => {
          expect(response.status).to.eq(200)
        })

      cy.getUsers()
        .then((response) => {
          expect(response.status).to.eq(200)

          const user = response.body.find((user) => user.email === heroe.email)
          expect(user).to.be.undefined
        })
    })

  })

  context('Not Found Delete User', () => {
    let userID

    const originalUser = {
      name: "Tony Stark",
      email: "stark@marvel.com",
      password: "katana123"
    }

    beforeEach(() => {
      cy.postUser(originalUser)
        .then((response => {
          userID = response.body.user.id
        }))
    })

    after(() => {

    })
    it('Deve retornar 404 e user not found', () => {

      cy.deleteUser(userID)
        .then(response => {
          expect(response.status).to.eq(200)
        })

      cy.deleteUser(userID)
        .then(response => {
          expect(response.status).to.eq(404)
          expect(response.body.error).to.eq('NotFoundError: User not found.')
        })

      cy.getUsers()
        .then((response) => {
          expect(response.status).to.eq(200)

          const user = response.body.find((user) => user.email === heroe.email)
          expect(user).to.be.undefined
        })
    })

  })
})
