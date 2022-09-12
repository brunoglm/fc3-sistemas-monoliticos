import InvoiceFactory from '../../factory/invoice-factory'
describe('Invoice factory unit test', () => {
  it('when have products and an id, then should create an invoice correctly', async () => {
    const props = {
      id: 'id',
      name: 'name',
      document: 'document',
      street: 'street',
      number: 'number',
      complement: 'complement',
      city: 'city',
      state: 'state',
      zipCode: 'zipcode',
      items: [
        {
          id: 'id',
          name: 'name',
          price: 100,
        },
        {
          id: 'id 2',
          name: 'name 2',
          price: 200,
        },
      ],
    }

    const invoice = InvoiceFactory.create(props)

    expect(invoice.id.id).toBe(props.id)
    expect(invoice.createdAt).toBeDefined()
    expect(invoice.updatedAt).toBeDefined()
    expect(invoice.name).toBe(props.name)
    expect(invoice.document).toBe(props.document)
    expect(invoice.address.street).toBe(props.street)
    expect(invoice.address.number).toBe(props.number)
    expect(invoice.address.complement).toBe(props.complement)
    expect(invoice.address.city).toBe(props.city)
    expect(invoice.address.state).toBe(props.state)
    expect(invoice.address.zipCode).toBe(props.zipCode)
    expect(invoice.items[0].id.id).toBe(props.items[0].id)
    expect(invoice.items[0].name).toBe(props.items[0].name)
    expect(invoice.items[0].price).toBe(props.items[0].price)
    expect(invoice.items[1].id.id).toBe(props.items[1].id)
    expect(invoice.items[1].name).toBe(props.items[1].name)
    expect(invoice.items[1].price).toBe(props.items[1].price)
  })

  it('when do not have products and an id, then should create an invoice correctly', async () => {
    type item = {
      id: string
      name: string
      price: number
    }
    const items: item[] = []

    const props = {
      name: 'name',
      document: 'document',
      street: 'street',
      number: 'number',
      complement: 'complement',
      city: 'city',
      state: 'state',
      zipCode: 'zipcode',
      items: items,
    }

    const invoice = InvoiceFactory.create(props)

    expect(invoice.id).toBeDefined()
    expect(invoice.createdAt).toBeDefined()
    expect(invoice.updatedAt).toBeDefined()
    expect(invoice.name).toBe(props.name)
    expect(invoice.document).toBe(props.document)
    expect(invoice.address.street).toBe(props.street)
    expect(invoice.address.number).toBe(props.number)
    expect(invoice.address.complement).toBe(props.complement)
    expect(invoice.address.city).toBe(props.city)
    expect(invoice.address.state).toBe(props.state)
    expect(invoice.address.zipCode).toBe(props.zipCode)
    expect(invoice.items.length).toBe(0)
  })
})
