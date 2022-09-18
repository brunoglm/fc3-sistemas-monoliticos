import UseCaseInterface from '../../../@shared/usecase/use-case-interface'
import { AddClientInputDto, AddClientOutputDto } from './add-client-usecase-dto'
import Client from '../../domain/client-entity'
import ClientGateway from '../../gateway/client-gateway'
import Id from '../../../@shared/domain/value-object/id-value-object'
import Address from '../../domain/address-value-object'

export default class AddClientUseCase implements UseCaseInterface {
  constructor(private readonly clientRepository: ClientGateway) {}

  async execute(input: AddClientInputDto): Promise<AddClientOutputDto> {
    const props = {
      id: new Id(input.id),
      name: input.name,
      email: input.email,
      document: input.document,
      address: new Address({
        street: input.address.street,
        number: input.address.number,
        complement: input.address.complement,
        city: input.address.city,
        state: input.address.state,
        zipCode: input.address.zipCode,
      }),
    }

    const client = new Client(props)
    this.clientRepository.add(client)

    return {
      id: client.id.id,
      name: client.name,
      document: client.document,
      email: client.email,
      address: {
        street: client.address.street,
        number: client.address.number,
        city: client.address.city,
        zipCode: client.address.zipCode,
        complement: client.address.complement,
        state: client.address.state,
      },
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    }
  }
}
