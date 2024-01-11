import prisma from '@/helpers/prismadb'

interface Parmas {
    productId:string;
  }

export default async function getProductById(params:Parmas) {
    try {
        const {productId} = params;
        const product = await prisma.product.findUnique ({
            where: {
                id: productId
            },
            //해당 상품을 생성한 user의 정보를 include
            include: {
                user: true
            }
        });

        if(!product) return null; //상품 없으면 return null

        return product; //있으면 product return

    } catch (error:any) {
        throw new Error(error);
    }
}