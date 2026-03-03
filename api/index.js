require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()
const prisma = require('./prisma.js')
const port = 3333

// Habilitar CORS para todas as origens
app.use(cors())
app.use(express.json())
app.use((err, req, res, next) => {
  console.log(err)
  if (err instanceof SyntaxError) {
    return res.status(400).json({ error: 'Invalid JSON format.' })
  }
  next()
})

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' })
})

app.get('/api/users', async (req, res) => {

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        password: false
      }
    })
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users.' })
  }

})

app.post('/api/users/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Input validation
    if (!name) {
      return res.status(400).json({
        error: 'ValidationError: The "name" field is required.'
      })
    }

    if (!email) {
      return res.status(400).json({
        error: 'ValidationError: The "email" field is required.'
      })
    }

    if (!password) {
      return res.status(400).json({
        error: 'ValidationError: The "password" field is required.'
      })
    }

    // Check for existing user
    const userExists = await prisma.user.findUnique({
      where: { email }
    })

    if (userExists) {
      return res.status(409).json({
        error: 'ConflictError: An account with this email already exists.'
      })
    }

    // Persist user in database
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password
      }
    })

    return res.status(201).json({
      message: 'User successfully created.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    })

  } catch (error) {
    console.error('User registration failed:', error)

    return res.status(500).json({
      error: 'InternalServerError: An unexpected error occurred while processing the request.'
    })
  }
})

app.put('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { name, email, password } = req.body

    // Validate ID
    if (!id) {
      return res.status(400).json({
        error: 'ValidationError: The "id" parameter is required.'
      })
    }

    // Check if user exists
    const userExists = await prisma.user.findUnique({
      where: { id: Number(id) }
    })

    if (!userExists) {
      return res.status(404).json({
        error: 'NotFoundError: User not found.'
      })
    }

    // Optional field validation
    if (!name && !email && !password) {
      return res.status(400).json({
        error: 'ValidationError: At least one field (name, email, password) must be provided for update.'
      })
    }

    // If updating email, check if another user already has it
    if (email) {
      const emailInUse = await prisma.user.findUnique({
        where: { email }
      })

      if (emailInUse && emailInUse.id !== Number(id)) {
        return res.status(409).json({
          error: 'ConflictError: Another account with this email already exists.'
        })
      }
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(password && { password })
      }
    })

    return res.status(200).json({
      message: 'User successfully updated.',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email
      }
    })

  } catch (error) {
    console.error('User update failed:', error)

    return res.status(500).json({
      error: 'InternalServerError: An unexpected error occurred while processing the request.'
    })
  }
})

app.delete('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params

    // Validate ID
    if (!id) {
      return res.status(400).json({
        error: 'ValidationError: The "id" parameter is required.'
      })
    }

    // Check if user exists
    const userExists = await prisma.user.findUnique({
      where: { id: Number(id) }
    })

    if (!userExists) {
      return res.status(404).json({
        error: 'NotFoundError: User not found.'
      })
    }

    // Delete user
    await prisma.user.delete({
      where: { id: Number(id) }
    })

    return res.status(200).json({
      message: 'User successfully deleted.'
    })

  } catch (error) {
    console.error('User deletion failed:', error)

    return res.status(500).json({
      error: 'InternalServerError: An unexpected error occurred while processing the request.'
    })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
