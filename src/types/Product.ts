type Images = {
    fullImage: string,
    miniImage: string
}
export type Product = {
    id: number,
    brand: string,
    name: string,
    description: string,
    price: number,
    discount: number,
    images: Images[]
}