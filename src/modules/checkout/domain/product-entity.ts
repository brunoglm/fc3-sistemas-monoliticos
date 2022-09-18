import Id from '../../@shared/domain/value-object/id-value-object'
import BaseEntity from '../../@shared/domain/entity/base-entity'
import AggregateRoot from '../../@shared/domain/entity/aggregate-root-interface'

type ProductProps = {
  id?: Id
  name: string
  description: string
  salesPrice: number
}

export default class Product extends BaseEntity implements AggregateRoot {
  constructor(private props: ProductProps) {
    super(props.id)
  }

  get name(): string {
    return this.props.name
  }

  get description(): string {
    return this.props.description
  }

  get salesPrice(): number {
    return this.props.salesPrice
  }
}
