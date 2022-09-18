import ProductRepositoryFactory from '../../repository/factory/product-repository-factory'
import AddProductUseCase from './add-product-usecase'

export default class AddProductUseCaseFactory {
  static create(): AddProductUseCase {
    const productRepository = ProductRepositoryFactory.create()
    return new AddProductUseCase(productRepository)
  }
}
