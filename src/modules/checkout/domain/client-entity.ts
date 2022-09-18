import BaseEntity from '../../@shared/domain/entity/base-entity'
import AggregateRoot from '../../@shared/domain/entity/aggregate-root-interface'
import Id from '../../@shared/domain/value-object/id-value-object'
import Address from './address-value-object'

type ClientProps = {
  id?: Id
  name: string
  document: string
  email: string
  address: Address
}

export default class Client extends BaseEntity implements AggregateRoot {
  constructor(private props: ClientProps) {
    super(props.id)
  }

  get name(): string {
    return this.props.name
  }

  get document(): string {
    return this.props.document
  }

  get email(): string {
    return this.props.email
  }

  get address(): Address {
    return this.props.address
  }
}
