import { Sequelize } from 'sequelize-typescript'
import CheckoutRepository from '../checkout-repository'
import { OrderModel } from '../model/order-model'
import { OrderProductModel } from '../model/order-product-model'
import Order from '../../domain/order-entity'
import Client from '../../domain/client-entity'
import Id from '../../../@shared/domain/value-object/id-value-object'
import Product from '../../domain/product-entity'

describe('CheckoutRepository integration test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([OrderModel, OrderProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should place an order', async () => {
    const client = new Client({
      id: new Id('c1'),
      name: 'client name',
      document: 'client document',
      email: 'client email',
      address: null,
    })

    const product1 = new Product({
      id: new Id('p1'),
      name: 'product 1',
      description: 'description',
      salesPrice: 100,
    })

    const product2 = new Product({
      id: new Id('p2'),
      name: 'product 2',
      description: 'description',
      salesPrice: 100,
    })

    const order = new Order({
      client: client,
      products: [product1, product2],
    })

    const checkoutRepository = new CheckoutRepository()
    await checkoutRepository.addOrder(order)

    const orderDb = await OrderModel.findOne({
      where: { id: order.id.id },
      include: ['products'],
    })

    expect(orderDb.id).toBe(order.id.id)
    expect(orderDb.createdAt).toBeDefined()
    expect(orderDb.updatedAt).toBeDefined()
    expect(orderDb.clientId).toBe(client.id.id)
    expect(orderDb.products[0].id).toBe(order.products[0].id.id)
    expect(orderDb.products[0].name).toBe(order.products[0].name)
    expect(orderDb.products[0].description).toBe(order.products[0].description)
    expect(orderDb.products[0].salesPrice).toBe(order.products[1].salesPrice)
    expect(orderDb.products[1].id).toBe(order.products[1].id.id)
    expect(orderDb.products[1].name).toBe(order.products[1].name)
    expect(orderDb.products[1].description).toBe(order.products[1].description)
    expect(orderDb.products[1].salesPrice).toBe(order.products[1].salesPrice)
  })
})
