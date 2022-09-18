import StoreCatalogFacade from '../facade/store-catalog-facade'
import ProductRepository from '../repository/product-repository'
import FindProductUseCase from '../usecase/find-product/find-product-usecase'
import FindAllProductsUsecase from '../usecase/find-all-products/find-all-products-usecase'
import AddProductUsecase from '../usecase/add-product/add-product'

export default class StoreCatalogFacadeFactory {
  static create(): StoreCatalogFacade {
    const productRepository = new ProductRepository()
    const findUseCase = new FindProductUseCase(productRepository)
    const findAllUseCase = new FindAllProductsUsecase(productRepository)
    const addUseCase = new AddProductUsecase(productRepository)

    const facade = new StoreCatalogFacade({
      findUseCase,
      findAllUseCase,
      addUseCase,
    })

    return facade
  }
}
