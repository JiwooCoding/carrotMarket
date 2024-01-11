import { PRODUCTS_PER_PAGE } from '@/constants';
import prisma from '@/helpers/prismadb'

export interface ProductsParams{
    latitude?: number;
    longitude?: number;
    category?: string;
    page?: number;
    skip?: number;
}

export default async function getProducts(params: ProductsParams) {
    try {
        const {latitude, longitude, category, skip} = params;

        let query:any = {};

        if(category){
            query.category = category;
        }

        if(latitude) {
            query.latitude = {
                gte: Number(latitude) - 0.01,
                lte: Number(latitude) + 0.01
            }
        }

        if(longitude){
            query.longitude = {
                gte: Number(longitude) - 0.01,
                lte: Number(longitude) + 0.01
            }
        }

        //findMany: 여러개 가지고 오겠다.
        //데이터베이스에서 제품을 검색하고 query객체를 사용해 검색 조건을 적용한다.
        const products = await prisma.product.findMany({
            where: query,
            orderBy:{
                createdAt: 'desc'
            },
            skip: skip ? Number(skip) : 0, //페이지 이동시 넘겨지는 상품 수
            take:PRODUCTS_PER_PAGE, //보여지는 상품의 수
        })

        const totalItems = await prisma.product.count({where: query})

        return {
            data: products,
            totalItems
        }

    } catch (error: any) {
        throw new Error(error)
    }
}