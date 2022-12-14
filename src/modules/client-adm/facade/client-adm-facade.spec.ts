import { Sequelize } from 'sequelize-typescript'
import { ClientModel } from '../repository/client-model'
import ClientAdmFacadeFactory from '../factory/client-adm-facade-factory'

describe('ClientAdmFacade test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([ClientModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a client', async () => {
    const facade = ClientAdmFacadeFactory.create()

    const input = {
      id: '1',
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

    await facade.add(input)

    const result = await ClientModel.findOne({ where: { id: '1' } })

    expect(result).toBeDefined()
    expect(result.name).toEqual(input.name)
    expect(result.email).toEqual(input.email)
    expect(result.document).toEqual(input.document)
    expect(result.street).toEqual(input.address.street)
    expect(result.number).toEqual(input.address.number)
    expect(result.zipCode).toEqual(input.address.zipCode)
    expect(result.state).toEqual(input.address.state)
    expect(result.complement).toEqual(input.address.complement)
    expect(result.city).toEqual(input.address.city)
  })

  it('should find a client', async () => {
    const facade = ClientAdmFacadeFactory.create()

    const client = await ClientModel.create({
      id: '1',
      name: 'Client 1',
      email: 'x@x.com',
      document: 'document',
      street: 'street',
      number: 'number',
      complement: 'complement',
      city: 'city',
      state: 'state',
      zipCode: 'zipcode',
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const result = await facade.find({ id: client.id })

    expect(result).toBeDefined()
    expect(result.id).toEqual(client.id)
    expect(result.name).toEqual(client.name)
    expect(result.email).toEqual(client.email)
    expect(result.address.street).toEqual(client.street)
    expect(result.address.number).toEqual(client.number)
    expect(result.address.zipCode).toEqual(client.zipCode)
    expect(result.address.state).toEqual(client.state)
    expect(result.address.complement).toEqual(client.complement)
    expect(result.address.city).toEqual(client.city)
  })
})
