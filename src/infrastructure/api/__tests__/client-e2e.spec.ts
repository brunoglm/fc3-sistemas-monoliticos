import { app, sequelize } from '../express'
import request from 'supertest'

describe('Client E2E tests', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a client', async () => {
    const requestProps = {
      name: 'Client 1',
      email: 'x@x.com',
      document: 'document',
      address: {
        street: 'street',
        number: 'number',
        complement: 'complement',
        city: 'city',
        state: 'state',
        zipCode: 'zipcode',
      },
    }

    const response = await request(app).post('/clients').send(requestProps)

    expect(response.body.id).toBeDefined()
    expect(response.body.createdAt).toBeDefined()
    expect(response.body.updatedAt).toBeDefined()
    expect(response.body.name).toBe(requestProps.name)
    expect(response.body.document).toBe(requestProps.document)
    expect(response.body.email).toBe(requestProps.email)
    expect(response.body.address.street).toBe(requestProps.address.street)
    expect(response.body.address.number).toBe(requestProps.address.number)
    expect(response.body.address.complement).toBe(
      requestProps.address.complement
    )
    expect(response.body.address.city).toBe(requestProps.address.city)
    expect(response.body.address.state).toBe(requestProps.address.state)
    expect(response.body.address.zipCode).toBe(requestProps.address.zipCode)
  })
})
