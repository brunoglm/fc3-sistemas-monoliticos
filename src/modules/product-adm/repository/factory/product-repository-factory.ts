import ProductGateway from '../../gateway/product-gateway'
import ProductRepository from '../product-repository'

export default class ProductRepositoryFactory {
  static create(): ProductGateway {
    return new ProductRepository()
  }
}
