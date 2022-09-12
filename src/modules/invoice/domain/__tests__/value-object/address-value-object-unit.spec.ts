import Address from '../../value-object/address-value-object'

describe('Address unit test', () => {
  it('should create an address', async () => {
    const props = {
      street: 'street',
      number: 'number',
      complement: 'complement',
      city: 'city',
      state: 'state',
      zipCode: 'zipCode',
    }

    const address = new Address(props)

    expect(address.street).toBe(props.street)
    expect(address.number).toBe(props.number)
    expect(address.complement).toBe(props.complement)
    expect(address.city).toBe(props.city)
    expect(address.state).toBe(props.state)
    expect(address.zipCode).toBe(props.zipCode)
  })
})
