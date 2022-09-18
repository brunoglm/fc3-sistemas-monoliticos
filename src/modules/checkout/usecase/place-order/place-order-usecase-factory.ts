import PlaceOrderUseCase from './place-order-usecase'
import InvoiceFacadeFactory from '../../../invoice/facade/factory/invoice-facade-factory'
import ClientAdmFacadeFactory from '../../../client-adm/factory/client-adm-facade-factory'
import ProductAdmFacadeFactory from '../../../product-adm/factory/facade-factory'
import StoreCatalogFacadeFactory from '../../../store-catalog/factory/facade-factory'
import PaymentFacadeFactory from '../../../payment/factory/payment-facade-factory'
import CheckoutRepositoryFactory from '../../repository/factory/checkout-repository-factory'

export default class PlaceOrderUseCaseFactory {
  static create(): PlaceOrderUseCase {
    const invoiceFacade = InvoiceFacadeFactory.create()
    const clientFacade = ClientAdmFacadeFactory.create()
    const productFacade = ProductAdmFacadeFactory.create()
    const catalogFacade = StoreCatalogFacadeFactory.create()
    const paymentFacade = PaymentFacadeFactory.create()
    const checkoutRepository = CheckoutRepositoryFactory.create()

    return new PlaceOrderUseCase({
      clientFacade,
      productFacade,
      catalogFacade,
      paymentFacade,
      invoiceFacade,
      checkoutRepository,
    })
  }
}
