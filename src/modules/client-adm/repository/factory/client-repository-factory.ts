import ClientGateway from '../../gateway/client-gateway'
import ClientRepository from '../client-repository'

export default class ClientRepositoryFactory {
  static create(): ClientGateway {
    return new ClientRepository()
  }
}
