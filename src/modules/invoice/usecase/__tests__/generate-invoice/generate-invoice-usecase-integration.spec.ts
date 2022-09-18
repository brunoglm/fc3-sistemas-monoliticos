import GenerateInvoiceUseCase from '../../generate-invoice/generate-invoice-usecase'
import InvoiceRepository from '../../../repository/invoice-repository'
import { Sequelize } from 'sequelize-typescript'
import { InvoiceModel } from '../../../repository/model/invoice-model'
import { InvoiceProductModel } from '../../../repository/model/invoice-product-model'

describe('Generate invoice usecase unit test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([InvoiceModel, InvoiceProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should generate an invoice passing an invoice id', async () => {
    const repository = new InvoiceRepository()
    const usecase = new GenerateInvoiceUseCase(repository)

    const input = {
      id: 'id',
      name: 'name',
      document: 'document',
      street: 'street',
      number: 'number',
      complement: 'complement',
      city: 'city',
      state: 'state',
      zipCode: 'zipcode',
      items: [
        {
          id: 'id',
          name: 'name',
          price: 100,
        },
        {
          id: 'id 2',
          name: 'name 2',
          price: 200,
        },
      ],
    }

    const totalExpected = 300

    const result = await usecase.execute(input)

    const invoiceDb = await InvoiceModel.findOne({
      where: { id: result.id },
      include: ['items'],
    })

    expect(result.id).toBe(input.id)
    expect(result.name).toBe(input.name)
    expect(result.document).toBe(input.document)
    expect(result.street).toBe(input.street)
    expect(result.number).toBe(input.number)
    expect(result.complement).toBe(input.complement)
    expect(result.city).toBe(input.city)
    expect(result.state).toBe(input.state)
    expect(result.zipCode).toBe(input.zipCode)
    expect(result.items[0]).toStrictEqual(input.items[0])
    expect(result.items[1]).toStrictEqual(input.items[1])
    expect(result.total).toBe(totalExpected)
    expect(invoiceDb.id).toBe(input.id)
    expect(invoiceDb.createdAt).toBeDefined()
    expect(invoiceDb.updatedAt).toBeDefined()
    expect(invoiceDb.name).toBe(input.name)
    expect(invoiceDb.document).toBe(input.document)
    expect(invoiceDb.street).toBe(input.street)
    expect(invoiceDb.number).toBe(input.number)
    expect(invoiceDb.complement).toBe(input.complement)
    expect(invoiceDb.city).toBe(input.city)
    expect(invoiceDb.state).toBe(input.state)
    expect(invoiceDb.zipCode).toBe(input.zipCode)
    expect(invoiceDb.items[0].id).toBe(input.items[0].id)
    expect(invoiceDb.items[0].name).toBe(input.items[0].name)
    expect(invoiceDb.items[0].price).toBe(input.items[0].price)
    expect(invoiceDb.items[1].id).toBe(input.items[1].id)
    expect(invoiceDb.items[1].name).toBe(input.items[1].name)
    expect(invoiceDb.items[1].price).toBe(input.items[1].price)
  })

  it('should generate an invoice do not passing an invoice id', async () => {
    const repository = new InvoiceRepository()
    const usecase = new GenerateInvoiceUseCase(repository)

    const input = {
      name: 'name',
      document: 'document',
      street: 'street',
      number: 'number',
      complement: 'complement',
      city: 'city',
      state: 'state',
      zipCode: 'zipcode',
      items: [
        {
          id: 'id',
          name: 'name',
          price: 100,
        },
        {
          id: 'id 2',
          name: 'name 2',
          price: 200,
        },
      ],
    }

    const totalExpected = 300

    const result = await usecase.execute(input)

    const invoiceDb = await InvoiceModel.findOne({
      where: { id: result.id },
      include: ['items'],
    })

    expect(result.id).toBeDefined()
    expect(result.name).toBe(input.name)
    expect(result.document).toBe(input.document)
    expect(result.street).toBe(input.street)
    expect(result.number).toBe(input.number)
    expect(result.complement).toBe(input.complement)
    expect(result.city).toBe(input.city)
    expect(result.state).toBe(input.state)
    expect(result.zipCode).toBe(input.zipCode)
    expect(result.items[0]).toStrictEqual(input.items[0])
    expect(result.items[1]).toStrictEqual(input.items[1])
    expect(result.total).toBe(totalExpected)
    expect(invoiceDb.id).toBe(result.id)
    expect(invoiceDb.createdAt).toBeDefined()
    expect(invoiceDb.updatedAt).toBeDefined()
    expect(invoiceDb.name).toBe(input.name)
    expect(invoiceDb.document).toBe(input.document)
    expect(invoiceDb.street).toBe(input.street)
    expect(invoiceDb.number).toBe(input.number)
    expect(invoiceDb.complement).toBe(input.complement)
    expect(invoiceDb.city).toBe(input.city)
    expect(invoiceDb.state).toBe(input.state)
    expect(invoiceDb.zipCode).toBe(input.zipCode)
    expect(invoiceDb.items[0].id).toBe(input.items[0].id)
    expect(invoiceDb.items[0].name).toBe(input.items[0].name)
    expect(invoiceDb.items[0].price).toBe(input.items[0].price)
    expect(invoiceDb.items[1].id).toBe(input.items[1].id)
    expect(invoiceDb.items[1].name).toBe(input.items[1].name)
    expect(invoiceDb.items[1].price).toBe(input.items[1].price)
  })
})
