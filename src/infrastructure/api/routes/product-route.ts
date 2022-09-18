import express, { Request, Response } from 'express'
import AddProductUseCaseFactory from '../../../modules/product-adm/usecase/add-product/add-product-usecase-factory'

export const productRoute = express.Router()

productRoute.post('/', async (req: Request, res: Response) => {
  const usecase = AddProductUseCaseFactory.create()
  try {
    const inputDto = {
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
      purchasePrice: req.body.purchasePrice,
      stock: req.body.stock,
    }
    const output = await usecase.execute(inputDto)
    res.send(output)
  } catch (error) {
    res.status(500).send(error)
  }
})
