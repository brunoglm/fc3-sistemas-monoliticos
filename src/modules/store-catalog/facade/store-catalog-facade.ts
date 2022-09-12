import UseCaseInterface from '../../@shared/usecase/use-case-interface'
import FindProductUseCase from '../usecase/find-product/find-product-usecase'
import FindAllProductsUsecase from '../usecase/find-all-products/find-all-products-usecase'
import StoreCatalogFacadeInterface, {
  FindAllStoreCatalogFacadeOutputDto,
  FindStoreCatalogFacadeInputDto,
  FindStoreCatalogFacadeOutputDto,
} from './store-catalog-facade-interface'

export interface UseCasesProps {
  findUseCase: FindProductUseCase
  findAllUseCase: FindAllProductsUsecase
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
  private _findUseCase: FindProductUseCase
  private _findAllUseCase: FindAllProductsUsecase

  constructor(props: UseCasesProps) {
    this._findAllUseCase = props.findAllUseCase
    this._findUseCase = props.findUseCase
  }

  async find(
    input: FindStoreCatalogFacadeInputDto
  ): Promise<FindStoreCatalogFacadeOutputDto> {
    return this._findUseCase.execute(input)
  }

  async findAll(): Promise<FindAllStoreCatalogFacadeOutputDto> {
    return this._findAllUseCase.execute()
  }
}
