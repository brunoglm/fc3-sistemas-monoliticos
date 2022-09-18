import express, { Request, Response } from 'express'
import AddProductUsecase from '../../../modules/store-catalog/usecase/add-product/add-product'
import ProductRepository from '../../../modules/store-catalog/repository/product-repository'

export const catalogRoute = express.Router()

catalogRoute.post('/', async (req: Request, res: Response) => {
  const repo = new ProductRepository()
  const usecase = new AddProductUsecase(repo)
  try {
    const inputDto = {
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
      salesPrice: req.body.salesPrice,
    }
    const output = await usecase.execute(inputDto)
    res.send(output)
  } catch (error) {
    res.status(500).send(error)
  }
})
