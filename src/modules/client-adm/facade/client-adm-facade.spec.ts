import { Sequelize } from 'sequelize-typescript'
import { ClientModel } from '../repository/client-model'
import ClientRepository from '../repository/client-repository'
import AddClientUseCase from '../usecase/add-client/add-client-usecase'
import ClientAdmFacade from './client-adm-facade'
import FindClientUseCase from '../usecase/find-client/find-client-usecase'
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
      address: 'Address 1',
    }

    await facade.add(input)

    const result = await ClientModel.findOne({ where: { id: '1' } })

    expect(result).toBeDefined()
    expect(result.name).toEqual(input.name)
    expect(result.email).toEqual(input.email)
    expect(result.address).toEqual(input.address)
  })

  it('should find a client', async () => {
    const facade = ClientAdmFacadeFactory.create()

    const client = await ClientModel.create({
      id: '1',
      name: 'Client 1',
      email: 'x@x.com',
      address: 'Adress 1',
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const result = await facade.find({ id: client.id })

    expect(result).toBeDefined()
    expect(result.id).toEqual(client.id)
    expect(result.name).toEqual(client.name)
    expect(result.email).toEqual(client.email)
    expect(result.address).toEqual(client.address)
  })
})
