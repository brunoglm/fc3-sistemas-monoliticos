import Product from '../../entity/product-entity'
import ProductService from '../../service/product-service'

describe('Product service unit test', () => {
  it('when have products, then should calculate the total correctly', async () => {
    const product1 = new Product({
      name: 'name 1',
      price: 120,
    })

    const product2 = new Product({
      name: 'name 2',
      price: 230,
    })

    const product3 = new Product({
      name: 'name 3',
      price: 50,
    })

    const products = [product1, product2, product3]

    const totalExpected = 400

    const total = ProductService.total(products)

    expect(total).toBe(totalExpected)
  })

  it('when do not have products, then should return the default value', async () => {
    const totalExpected = 0

    const total = ProductService.total([])

    expect(total).toBe(totalExpected)
  })
})
