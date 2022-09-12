import UseCaseInterface from '../../../@shared/usecase/use-case-interface'
import { AddClientInputDto, AddClientOutputDto } from './add-client-usecase-dto'
import Client from '../../domain/client-entity'
import ClientGateway from '../../gateway/client-gateway'
import Id from '../../../@shared/domain/value-object/id-value-object'

export default class AddClientUseCase implements UseCaseInterface {
  constructor(private readonly clientRepository: ClientGateway) {}

  async execute(input: AddClientInputDto): Promise<AddClientOutputDto> {
    const props = {
      id: new Id(input.id),
      name: input.name,
      email: input.email,
      address: input.address,
    }

    const client = new Client(props)
    this.clientRepository.add(client)

    return {
      id: client.id.id,
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    }
  }
}