import { testloApi } from "../../api/teslo-api"
import type { ProductsResponse } from "../../interfaces/products.reponse";


interface Options{
    limit?: number | string;
    offset?: number | string;
    sizes?: string;
    gender?: string;
    minPrice?: number;
    maxPrice?: number;
    query?: string;
}


export const getProductsAction = async(options: Options):Promise<ProductsResponse> => {

    const { limit, offset, sizes, gender, minPrice, maxPrice, query } = options;

    const { data } = await testloApi.get<ProductsResponse>('/products', {
        params: {
            limit,
            offset,
            sizes,
            gender,
            minPrice,
            maxPrice,
            q: query
        }
    });

    const productsWithImageUrl = data.products.map(product => ({
        ...product,
        images: product.images.map(image => `${import.meta.env.VITE_API_URL}/files/product/${image}`)
    }))


    return {
        ...data,
        products: productsWithImageUrl
    };
}