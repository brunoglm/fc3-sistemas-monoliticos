import InvoiceFacadeInterface from '../invoice-facade-interface'
import InvoiceFacade from '../invoice-facade'
import FindInvoiceUseCase from '../../usecase/find-invoice/find-invoice-usecase'
import GenerateInvoiceUseCase from '../../usecase/generate-invoice/generate-invoice-usecase'
import InvoiceRepositoryFactory from '../../repository/factory/invoice-repository-factory'

export default class InvoiceFacadeFactory {
  static create(): InvoiceFacadeInterface {
    const repository = InvoiceRepositoryFactory.create()
    const findUseCase = new FindInvoiceUseCase(repository)
    const generateUseCase = new GenerateInvoiceUseCase(repository)
    const invoiceFacade = new InvoiceFacade({ findUseCase, generateUseCase })

    return invoiceFacade
  }
}
