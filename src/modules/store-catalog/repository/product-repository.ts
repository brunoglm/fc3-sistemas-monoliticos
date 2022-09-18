import ProductGateway from '../gateway/product-gateway'
import StoreProductModel from './store-product-model'
import Product from '../domain/product-entity'
import Id from '../../@shared/domain/value-object/id-value-object'

export default class ProductRepository implements ProductGateway {
  async add(product: Product): Promise<void> {
    await StoreProductModel.create({
      id: product.id.id,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    })
  }
  async findAll(): Promise<Product[]> {
    const products = await StoreProductModel.findAll()

    return products.map(
      (product) =>
        new Product({
          id: new Id(product.id),
          name: product.name,
          description: product.description,
          salesPrice: product.salesPrice,
        })
    )
  }

  async find(id: string): Promise<Product> {
    const product = await StoreProductModel.findOne({
      where: {
        id: id,
      },
    })
    if (!product) {
      throw new Error('Product not found')
    }

    return new Product({
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    })
  }
}
