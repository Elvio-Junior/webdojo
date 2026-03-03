
describe('GET /api/users/register', () => {
  const heroes = [
    {
      name: "Bruce Wayne",
      email: "batman@justiceleague.com",
      password: "katana123"
    },
    {
      name: "Clark Kent",
      email: "superman@justiceleague.com",
      password: "katana123"
    },
    {
      name: "Diana Prince",
      email: "wonderwoman@justiceleague.com",
      password: "katana123"
    },
    {
      name: "Barry Allen",
      email: "flash@justiceleague.com",
      password: "katana123"
    },
    {
      name: "Arthur Curry",
      email: "aquaman@justiceleague.com",
      password: "katana123"
    }
  ];

  beforeEach(() => {
    heroes.forEach(heroe => {
      cy.postUser(heroe)
    });
  })

  after(() => {

  })
  it('Deve retornnar uma lista de usuarios', () => {

    cy.getUsers()
      .then((response) => {
        expect(response.status).to.eq(200)

        heroes.forEach(heroe => {
          const user = response.body.find((user) => user.email === heroe.email)
          expect(user.name).to.eq(heroe.name)
          expect(user.email).to.eq(heroe.email)
          expect(user).to.have.property('id')
        })
      })
  })

})