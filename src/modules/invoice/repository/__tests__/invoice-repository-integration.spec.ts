import { Sequelize } from 'sequelize-typescript'
import InvoiceFactory from '../../domain/factory/invoice-factory'
import { InvoiceModel } from '../model/invoice-model'
import InvoiceRepository from '../invoice-repository'
import { ProductModel } from '../model/product-model'

describe('InvoiceRepository integration test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([InvoiceModel, ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create an invoice', async () => {
    const props = {
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

    const invoice = InvoiceFactory.create(props)

    const invoiceRepository = new InvoiceRepository()
    await invoiceRepository.generate(invoice)

    const invoiceDb = await InvoiceModel.findOne({
      where: { id: invoice.id.id },
      include: ['items'],
    })

    expect(invoiceDb.id).toBe(invoice.id.id)
    expect(invoiceDb.createdAt).toBeDefined()
    expect(invoiceDb.updatedAt).toBeDefined()
    expect(invoiceDb.name).toBe(invoice.name)
    expect(invoiceDb.document).toBe(invoice.document)
    expect(invoiceDb.street).toBe(invoice.address.street)
    expect(invoiceDb.number).toBe(invoice.address.number)
    expect(invoiceDb.complement).toBe(invoice.address.complement)
    expect(invoiceDb.city).toBe(invoice.address.city)
    expect(invoiceDb.state).toBe(invoice.address.state)
    expect(invoiceDb.zipCode).toBe(invoice.address.zipCode)
    expect(invoiceDb.items[0].id).toBe(invoice.items[0].id.id)
    expect(invoiceDb.items[0].name).toBe(invoice.items[0].name)
    expect(invoiceDb.items[0].price).toBe(invoice.items[0].price)
    expect(invoiceDb.items[1].id).toBe(invoice.items[1].id.id)
    expect(invoiceDb.items[1].name).toBe(invoice.items[1].name)
    expect(invoiceDb.items[1].price).toBe(invoice.items[1].price)
  })

  it('should find an invoice', async () => {
    const props = {
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

    const invoice = InvoiceFactory.create(props)

    await InvoiceModel.create(
      {
        id: invoice.id.id,
        name: invoice.name,
        document: invoice.document,
        street: invoice.address.street,
        number: invoice.address.number,
        complement: invoice.address.complement,
        city: invoice.address.city,
        state: invoice.address.state,
        zipCode: invoice.address.zipCode,
        items: invoice.items.map((item) => ({
          id: item.id.id,
          name: item.name,
          price: item.price,
        })),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        include: [{ model: ProductModel }],
      }
    )

    const invoiceRepository = new InvoiceRepository()
    const invoiceDb = await invoiceRepository.find(invoice.id.id)

    expect(invoiceDb.id.id).toBe(invoice.id.id)
    expect(invoiceDb.createdAt).toBeDefined()
    expect(invoiceDb.updatedAt).toBeDefined()
    expect(invoiceDb.name).toBe(invoice.name)
    expect(invoiceDb.document).toBe(invoice.document)
    expect(invoiceDb.address.street).toBe(invoice.address.street)
    expect(invoiceDb.address.number).toBe(invoice.address.number)
    expect(invoiceDb.address.complement).toBe(invoice.address.complement)
    expect(invoiceDb.address.city).toBe(invoice.address.city)
    expect(invoiceDb.address.state).toBe(invoice.address.state)
    expect(invoiceDb.address.zipCode).toBe(invoice.address.zipCode)
    expect(invoiceDb.items[0].id.id).toBe(invoice.items[0].id.id)
    expect(invoiceDb.items[0].name).toBe(invoice.items[0].name)
    expect(invoiceDb.items[0].price).toBe(invoice.items[0].price)
    expect(invoiceDb.items[1].id.id).toBe(invoice.items[1].id.id)
    expect(invoiceDb.items[1].name).toBe(invoice.items[1].name)
    expect(invoiceDb.items[1].price).toBe(invoice.items[1].price)
  })
})
