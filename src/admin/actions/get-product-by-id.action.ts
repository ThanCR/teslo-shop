import { testloApi } from "../../api/teslo-api";
import type { Product } from "../../interfaces/product.interface";


export const getProductByIdAction = async(id: string):Promise<Product> => {

    if( !id ) throw new Error('Id is required')
    
    if( id === 'new'){
        return {
            id: 'new',
            title: '',
            price: 0,
            slug: '',
            stock: 0,
            sizes: [],
            gender: 'men',
            tags: [],
            images: [],
        } as unknown as Product
    }


    const { data } = await testloApi.get<Product>(`/products/${id}`);

    const images = data.images.map(image => {
        if(image.includes('http')) return image;
        return `${import.meta.env.VITE_API_URL}/files/product/${image}`
    })

    return {
        ...data,
        images,
    }

}

