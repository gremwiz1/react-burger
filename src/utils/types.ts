export interface ITypeData  {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number,
    quantity: number | undefined
}
export interface ITypeOrder {
        "_id": string,
        "ingredients": Array<string>,
        "status": string,
        "name": string,
        "createdAt": string,
        "updatedAt": string,
        "number": number 
}