import UseCaseInterface from '../../../@shared/usecase/use-case-interface'
import InvoiceGateway from '../../gateway/invoice-gateway'
import InvoiceFactory from '../../domain/factory/invoice-factory'
import {
  GenerateInvoiceUseCaseInputDto,
  GenerateInvoiceUseCaseOutputDto,
} from './generate-invoice-dto'
import ProductService from '../../domain/service/product-service'

export default class GenerateInvoiceUseCase implements UseCaseInterface {
  private _repository: InvoiceGateway

  constructor(repository: InvoiceGateway) {
    this._repository = repository
  }

  async execute(
    input: GenerateInvoiceUseCaseInputDto
  ): Promise<GenerateInvoiceUseCaseOutputDto> {
    const invoice = InvoiceFactory.create(input)

    await this._repository.generate(invoice)

    return {
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
      total: ProductService.total(invoice.items),
    }
  }
}
