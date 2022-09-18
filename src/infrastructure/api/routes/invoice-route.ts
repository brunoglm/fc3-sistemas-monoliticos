import express, { Request, Response } from 'express'
import FindInvoiceUseCaseFactory from '../../../modules/invoice/usecase/find-invoice/find-invoice-usecase-factory'
import GenerateInvoiceUseCaseFactory from '../../../modules/invoice/usecase/generate-invoice/generate-invoice-usecase-factory'

export const invoiceRoute = express.Router()

invoiceRoute.post('/', async (req: Request, res: Response) => {
  const usecase = GenerateInvoiceUseCaseFactory.create()
  try {
    const inputDto = {
      name: req.body.name,
      document: req.body.document,
      street: req.body.street,
      number: req.body.number,
      complement: req.body.complement,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode,
      items: req.body.items.map((i: any) => ({
        id: i.id,
        name: i.name,
        price: i.price,
      })),
    }
    const output = await usecase.execute(inputDto)
    res.send(output)
  } catch (error) {
    res.status(500).send(error)
  }
})

invoiceRoute.get('/:id', async (req: Request, res: Response) => {
  const usecase = FindInvoiceUseCaseFactory.create()
  try {
    const inputDto = {
      id: req.params.id,
    }
    const output = await usecase.execute(inputDto)
    res.send(output)
  } catch (error) {
    res.status(500).send(error)
  }
})
