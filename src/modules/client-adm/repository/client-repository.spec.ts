import { Sequelize } from 'sequelize-typescript'
import Id from '../../@shared/domain/value-object/id-value-object'
import Address from '../domain/address-value-object'
import Client from '../domain/client-entity'
import { ClientModel } from './client-model'
import ClientRepository from './client-repository'

describe('ClientRepository test', () => {
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
    const client = new Client({
      id: new Id('1'),
      name: 'Client 1',
      email: 'x@x.com',
      document: 'document',
      address: new Address({
        street: 'street',
        number: 'number',
        complement: 'complement',
        city: 'city',
        state: 'state',
        zipCode: 'zipcode',
      }),
    })

    const repository = new ClientRepository()

    await repository.add(client)

    const result = await ClientModel.findOne({ where: { id: '1' } })

    expect(result).toBeDefined()
    expect(result.id).toEqual(client.id.id)
    expect(result.name).toEqual(client.name)
    expect(result.document).toEqual(client.document)
    expect(result.email).toEqual(client.email)
    expect(result.street).toEqual(client.address.street)
    expect(result.number).toEqual(client.address.number)
    expect(result.zipCode).toEqual(client.address.zipCode)
    expect(result.state).toEqual(client.address.state)
    expect(result.complement).toEqual(client.address.complement)
    expect(result.city).toEqual(client.address.city)
    expect(result.createdAt).toStrictEqual(client.createdAt)
    expect(result.updatedAt).toStrictEqual(client.updatedAt)
  })

  it('should find a client', async () => {
    const client = await ClientModel.create({
      id: '1',
      name: 'Client 1',
      document: 'document',
      email: 'x@x.com',
      street: 'street',
      number: 'number',
      complement: 'complement',
      city: 'city',
      state: 'state',
      zipCode: 'zipcode',
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const repository = new ClientRepository()

    const result = await repository.find(client.id)

    expect(result.id.id).toEqual(client.id)
    expect(result.name).toEqual(client.name)
    expect(result.document).toEqual(client.document)
    expect(result.email).toEqual(client.email)
    expect(result.address.street).toEqual(client.street)
    expect(result.address.number).toEqual(client.number)
    expect(result.address.zipCode).toEqual(client.zipCode)
    expect(result.address.state).toEqual(client.state)
    expect(result.address.complement).toEqual(client.complement)
    expect(result.address.city).toEqual(client.city)
    expect(result.createdAt).toStrictEqual(client.createdAt)
    expect(result.updatedAt).toStrictEqual(client.updatedAt)
  })
})
