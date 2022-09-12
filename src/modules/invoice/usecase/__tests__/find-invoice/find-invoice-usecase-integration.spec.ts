import FindInvoiceUseCase from '../../find-invoice/find-invoice-usecase'
import InvoiceFactory from '../../../domain/factory/invoice-factory'
import InvoiceRepository from '../../../repository/invoice-repository'
import { InvoiceModel } from '../../../repository/model/invoice-model'
import { ProductModel } from '../../../repository/model/product-model'
import { Sequelize } from 'sequelize-typescript'

describe('Find invoice usecase unit test', () => {
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

  it('should find an invoice', async () => {
    const repository = new InvoiceRepository()
    const usecase = new FindInvoiceUseCase(repository)

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
        createdAt: invoice.createdAt,
        updatedAt: invoice.updatedAt,
      },
      {
        include: [{ model: ProductModel }],
      }
    )

    const input = {
      id: invoice.id.id,
    }

    const totalExpected = 300

    const result = await usecase.execute(input)

    expect(result.id).toBe(invoice.id.id)
    expect(result.createdAt).toBeDefined()
    expect(result.name).toBe(invoice.name)
    expect(result.document).toBe(invoice.document)
    expect(result.address.street).toBe(invoice.address.street)
    expect(result.address.number).toBe(invoice.address.number)
    expect(result.address.complement).toBe(invoice.address.complement)
    expect(result.address.city).toBe(invoice.address.city)
    expect(result.address.state).toBe(invoice.address.state)
    expect(result.address.zipCode).toBe(invoice.address.zipCode)
    expect(result.items[0].id).toStrictEqual(invoice.items[0].id.id)
    expect(result.items[0].name).toStrictEqual(invoice.items[0].name)
    expect(result.items[0].price).toStrictEqual(invoice.items[0].price)
    expect(result.items[1].id).toStrictEqual(invoice.items[1].id.id)
    expect(result.items[1].name).toStrictEqual(invoice.items[1].name)
    expect(result.items[1].price).toStrictEqual(invoice.items[1].price)
    expect(result.total).toBe(totalExpected)
  })
})