import FindProductUseCase from '../usecase/find-product/find-product-usecase'
import FindAllProductsUsecase from '../usecase/find-all-products/find-all-products-usecase'
import StoreCatalogFacadeInterface, {
  AddProductFacadeInputDto,
  AddProductFacadeOutputDto,
  FindAllStoreCatalogFacadeOutputDto,
  FindStoreCatalogFacadeInputDto,
  FindStoreCatalogFacadeOutputDto,
} from './store-catalog-facade-interface'
import AddProductUsecase from '../usecase/add-product/add-product'

export interface UseCasesProps {
  findUseCase: FindProductUseCase
  findAllUseCase: FindAllProductsUsecase
  addUseCase: AddProductUsecase
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
  private _findUseCase: FindProductUseCase
  private _findAllUseCase: FindAllProductsUsecase
  private _addUsecase: AddProductUsecase

  constructor(props: UseCasesProps) {
    this._findAllUseCase = props.findAllUseCase
    this._findUseCase = props.findUseCase
    this._addUsecase = props.addUseCase
  }
  async add(
    input: AddProductFacadeInputDto
  ): Promise<AddProductFacadeOutputDto> {
    return this._addUsecase.execute(input)
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
