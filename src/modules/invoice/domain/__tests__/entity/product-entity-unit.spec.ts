import Id from '../../../../@shared/domain/value-object/id-value-object'
import Product from '../../entity/product-entity'

describe('Product unit test', () => {
  it('should create a product passing an identification', async () => {
    const props = {
      id: new Id(),
      name: 'name',
      price: 10020,
    }

    const product = new Product(props)

    expect(product.id.id).toBe(props.id.id)
    expect(product.name).toBe(props.name)
    expect(product.price).toBe(props.price)
    expect(product.createdAt).toBeDefined()
    expect(product.updatedAt).toBeDefined()
  })

  it('should create a product that does not pass an identification', async () => {
    const props = {
      name: 'name',
      price: 10020,
    }

    const product = new Product(props)

    expect(product.id).toBeDefined()
    expect(product.name).toBe(props.name)
    expect(product.price).toBe(props.price)
    expect(product.createdAt).toBeDefined()
    expect(product.updatedAt).toBeDefined()
  })
})
