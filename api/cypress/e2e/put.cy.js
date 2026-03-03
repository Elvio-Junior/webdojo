describe('PUT /api/users/:id', () => {

  let userID

  const originalUser = {
    name: "Peter Parker",
    email: "batman@justiceleague.com",
    password: "katana123"
  }

  const updateUser = {
    name: "Spiderman",
    email: "spider@justiceleague.com",
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
  it('Deve atualizar um usuario', () => {

    cy.putUser(userID, updateUser)
      .then(response => {
        expect(response.status).to.eq(200)
        expect(response.body.user.id).to.match(/^[-]?\d+$/)
        expect(response.body.user.name).to.eq(updateUser.name)
        expect(response.body.user.email).to.eq(updateUser.email)
      })

  })

})