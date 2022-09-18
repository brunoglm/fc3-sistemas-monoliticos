import ClientRepositoryFactory from '../../repository/factory/client-repository-factory'
import AddClientUseCase from './add-client-usecase'

export default class AddClientUseCaseFactory {
  static create(): AddClientUseCase {
    const clientRepository = ClientRepositoryFactory.create()
    return new AddClientUseCase(clientRepository)
  }
}
