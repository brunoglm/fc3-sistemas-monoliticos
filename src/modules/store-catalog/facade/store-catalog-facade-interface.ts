export interface FindStoreCatalogFacadeInputDto {
  id: string
}

export interface FindStoreCatalogFacadeOutputDto {
  id: string
  name: string
  description: string
  salesPrice: number
}

export interface FindAllStoreCatalogFacadeOutputDto {
  products: {
    id: string
    name: string
    description: string
    salesPrice: number
  }[]
}

export interface AddProductFacadeInputDto {
  id?: string
  name: string
  description: string
  salesPrice: number
}

export interface AddProductFacadeOutputDto {
  id: string
  name: string
  description: string
  salesPrice: number
}

export default interface StoreCatalogFacadeInterface {
  add(input: AddProductFacadeInputDto): Promise<AddProductFacadeOutputDto>
  find(
    input: FindStoreCatalogFacadeInputDto
  ): Promise<FindStoreCatalogFacadeOutputDto>
  findAll(): Promise<FindAllStoreCatalogFacadeOutputDto>
}
