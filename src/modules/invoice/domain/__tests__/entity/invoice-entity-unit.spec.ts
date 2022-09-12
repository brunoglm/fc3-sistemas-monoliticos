import Id from '../../../../@shared/domain/value-object/id-value-object'
import Invoice from '../../entity/invoice-entity'
import Product from '../../entity/product-entity'
import Address from '../../value-object/address-value-object'

describe('Invoice unit test', () => {
  it('should create an invoice passing an identification', async () => {
    const address = new Address({
      street: 'street',
      number: 'number',
      complement: 'complement',
      city: 'city',
      state: 'state',
      zipCode: 'zipCode',
    })

    const product1 = new Product({
      id: new Id(),
      name: 'name 1',
      price: 100,
    })

    const product2 = new Product({
      id: new Id(),
      name: 'name 2',
      price: 100,
    })

    const props = {
      id: new Id(),
      name: 'name',
      document: 'document',
      address: address,
      items: [product1, product2],
    }

    const invoice = new Invoice(props)

    expect(invoice.id.id).toBe(props.id.id)
    expect(invoice.createdAt).toBeDefined()
    expect(invoice.updatedAt).toBeDefined()
    expect(invoice.name).toBe(props.name)
    expect(invoice.document).toBe(props.document)
    expect(invoice.address).toStrictEqual(props.address)
    expect(invoice.items[0]).toStrictEqual(product1)
    expect(invoice.items[1]).toStrictEqual(product2)
  })

  it('should create an invoice that does not pass an identification', async () => {
    const address = new Address({
      street: 'street',
      number: 'number',
      complement: 'complement',
      city: 'city',
      state: 'state',
      zipCode: 'zipCode',
    })

    const product1 = new Product({
      id: new Id(),
      name: 'name 1',
      price: 100,
    })

    const product2 = new Product({
      id: new Id(),
      name: 'name 2',
      price: 100,
    })

    const props = {
      name: 'name',
      document: 'document',
      address: address,
      items: [product1, product2],
    }

    const invoice = new Invoice(props)

    expect(invoice.id).toBeDefined()
    expect(invoice.createdAt).toBeDefined()
    expect(invoice.updatedAt).toBeDefined()
    expect(invoice.name).toBe(props.name)
    expect(invoice.document).toBe(props.document)
    expect(invoice.address).toStrictEqual(props.address)
    expect(invoice.items[0]).toStrictEqual(product1)
    expect(invoice.items[1]).toStrictEqual(product2)
  })
})
