export interface Product {
    "id": string,
    "name": string,
    "image": string,
}

export interface ProductResponse {
    "products": Product[]
}