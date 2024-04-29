import type { IProduct } from "../types/product.type";

export const validateProductBody = (product: IProduct): boolean => {

    for(let key in product) {
        if(!product[key])
            return false;
    }

    return true;
}
