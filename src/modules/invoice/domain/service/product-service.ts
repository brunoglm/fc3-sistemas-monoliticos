import Product from '../entity/product-entity'

export default class ProductService {
  static total(products: Product[]): number {
    return products.reduce((acc, product) => acc + product.price, 0)
  }
}
