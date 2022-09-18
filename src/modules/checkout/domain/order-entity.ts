import Id from '../../@shared/domain/value-object/id-value-object'
import Client from './client-entity'
import Product from './product-entity'
import BaseEntity from '../../@shared/domain/entity/base-entity'
import AggregateRoot from '../../@shared/domain/entity/aggregate-root-interface'

type OrderProps = {
  id?: Id
  client: Client
  products: Product[]
  status?: string
}

export default class Order extends BaseEntity implements AggregateRoot {
  constructor(private props: OrderProps) {
    super(props.id)
    this.status = this.props.status
  }

  get client(): Client {
    return this.props.client
  }

  get products(): Product[] {
    return this.props.products
  }

  get status(): string {
    return this.props.status
  }

  get total(): number {
    return this.props.products.reduce(
      (total, product) => total + product.salesPrice,
      0
    )
  }

  private set status(value: string) {
    this.props.status = value ?? 'pending'
  }

  approved(): void {
    this.status = 'approved'
  }
}
