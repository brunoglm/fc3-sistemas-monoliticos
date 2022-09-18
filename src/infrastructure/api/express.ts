import express, { Express } from 'express'
import { Sequelize } from 'sequelize-typescript'
import { ClientModel } from '../../modules/client-adm/repository/client-model'
import { ProductModel } from '../../modules/product-adm/repository/product-model'
import { productRoute } from './routes/product-route'
import { clientRoute } from './routes/client-route'
import { InvoiceModel } from '../../modules/invoice/repository/model/invoice-model'
import { checkoutRoute } from './routes/checkout-route'
import { invoiceRoute } from './routes/invoice-route'
import { catalogRoute } from './routes/catalog-route'
import { InvoiceProductModel } from '../../modules/invoice/repository/model/invoice-product-model'
import { OrderModel } from '../../modules/checkout/repository/model/order-model'
import { OrderProductModel } from '../../modules/checkout/repository/model/order-product-model'
import TransactionModel from '../../modules/payment/repository/transaction-model'
import StoreProductModel from '../../modules/store-catalog/repository/store-product-model'

export const app: Express = express()
app.use(express.json())
app.use('/products', productRoute)
app.use('/clients', clientRoute)
app.use('/checkout', checkoutRoute)
app.use('/invoices', invoiceRoute)
app.use('/catalogs', catalogRoute)

export let sequelize: Sequelize

async function setupDb() {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  })

  sequelize.addModels([
    ProductModel,
    ClientModel,
    InvoiceModel,
    InvoiceProductModel,
    OrderModel,
    OrderProductModel,
    TransactionModel,
    StoreProductModel,
  ])

  await sequelize.sync()
}

setupDb()
