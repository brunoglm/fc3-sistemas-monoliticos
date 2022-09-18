import UseCaseInterface from '../../../@shared/usecase/use-case-interface'
import {
  FindClientInputDto,
  FindClientOutputDto,
} from './find-client-usecase-dto'
import ClientGateway from '../../gateway/client-gateway'

export default class FindClientUseCase implements UseCaseInterface {
  constructor(private readonly clientRepository: ClientGateway) {}

  async execute(input: FindClientInputDto): Promise<FindClientOutputDto> {
    const client = await this.clientRepository.find(input.id)

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
