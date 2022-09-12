import InvoiceGateway from '../../gateway/invoice-gateway'
import InvoiceRepository from '../invoice-repository'

export default class InvoiceRepositoryFactory {
  static create(): InvoiceGateway {
    return new InvoiceRepository()
  }
}
