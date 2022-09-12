import Invoice from '../entity/invoice-entity'
import Address from '../value-object/address-value-object'
import Product from '../entity/product-entity'
import Id from '../../../@shared/domain/value-object/id-value-object'

type invoiceFactoryProps = {
  id?: string
  name: string
  document: string
  street: string
  number: string
  complement: string
  city: string
  state: string
  zipCode: string
  items: {
    id: string
    name: string
    price: number
  }[]
}

export default class InvoiceFactory {
  static create(input: invoiceFactoryProps): Invoice {
    const addressProps = {
      street: input.street,
      number: input.number,
      complement: input.complement,
      city: input.city,
      state: input.state,
      zipCode: input.zipCode,
    }
    const address = new Address(addressProps)

    let products: Product[] = []
    for (const item of input.items) {
      const productProps = {
        id: new Id(item.id),
        name: item.name,
        price: item.price,
      }
      const product = new Product(productProps)
      products.push(product)
    }

    const invoiceProps = {
      id: new Id(input.id),
      name: input.name,
      document: input.document,
      address: address,
      items: products,
    }
    const invoice = new Invoice(invoiceProps)

    return invoice
  }
}
