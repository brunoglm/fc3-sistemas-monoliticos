import InvoiceRepositoryFactory from '../../repository/factory/invoice-repository-factory'
import FindInvoiceUseCase from './find-invoice-usecase'

export default class FindInvoiceUseCaseFactory {
  static create(): FindInvoiceUseCase {
    const invoiceRepository = InvoiceRepositoryFactory.create()
    return new FindInvoiceUseCase(invoiceRepository)
  }
}
