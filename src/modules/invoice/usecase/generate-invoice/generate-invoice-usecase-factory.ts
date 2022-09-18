import InvoiceRepositoryFactory from '../../repository/factory/invoice-repository-factory'
import GenerateInvoiceUseCase from './generate-invoice-usecase'

export default class GenerateInvoiceUseCaseFactory {
  static create(): GenerateInvoiceUseCase {
    const invoiceRepository = InvoiceRepositoryFactory.create()
    return new GenerateInvoiceUseCase(invoiceRepository)
  }
}
