import FindInvoiceUseCase from '../../find-invoice/find-invoice-usecase'
import InvoiceFactory from '../../../domain/factory/invoice-factory'

const invoice = InvoiceFactory.create({
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
    { id: 'id', name: 'name', price: 100 },
    {
      id: 'id 2',
      name: 'name 2',
      price: 200,
    },
  ],
})

const MockRepository = () => {
  return {
    generate: jest.fn(),
    find: jest.fn().mockResolvedValue(invoice),
  }
}

describe('Find invoice usecase unit test', () => {
  it('should find an invoice', async () => {
    const repository = MockRepository()
    const usecase = new FindInvoiceUseCase(repository)

    const input = {
      id: invoice.id.id,
    }

    const totalExpected = 300

    const result = await usecase.execute(input)

    expect(repository.find).toHaveBeenCalledTimes(1)
    expect(result.id).toBe(invoice.id.id)
    expect(result.createdAt).toBe(invoice.createdAt)
    expect(result.name).toBe(invoice.name)
    expect(result.document).toBe(invoice.document)
    expect(result.address.street).toBe(invoice.address.street)
    expect(result.address.number).toBe(invoice.address.number)
    expect(result.address.complement).toBe(invoice.address.complement)
    expect(result.address.city).toBe(invoice.address.city)
    expect(result.address.state).toBe(invoice.address.state)
    expect(result.address.zipCode).toBe(invoice.address.zipCode)
    expect(result.items[0].id).toStrictEqual(invoice.items[0].id.id)
    expect(result.items[0].name).toStrictEqual(invoice.items[0].name)
    expect(result.items[0].price).toStrictEqual(invoice.items[0].price)
    expect(result.items[1].id).toStrictEqual(invoice.items[1].id.id)
    expect(result.items[1].name).toStrictEqual(invoice.items[1].name)
    expect(result.items[1].price).toStrictEqual(invoice.items[1].price)
    expect(result.total).toBe(totalExpected)
  })
})
