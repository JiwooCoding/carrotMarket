import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/helpers/prismadb'

export async function POST(request: Request) {
    //로그인이 되어있는지 여부 확인
    const currentUser = await getCurrentUser()
    
    //로그인이 되어 있지 않은 상태
    if(!currentUser) {
        return NextResponse.error()
    }

    //request에는 사용자가 입력한 정보들이 들어있음
    const body = await request.json()

    //body에서 필요한 정보들만 추출해서 각각의 변수에 저장한다.
    //파싱된 JSON 데이터에서 필요한 정보들을 추출하여 각각의 변수에 저장하는 디스트럭처링(Destructuring)입니다.
    const {title, description, imageSrc, category, latitude, longitude, price, address} = body;

    //만약 body에 value가 하나도 없다면 return Error주고 끝낸다.
    Object.keys(body).forEach((value) => {
        if(!body[value]){
            return NextResponse.error()
        }
    })
    
    //body에 value가 있다면 Prisma를 사용해 데이터베이스에 새로운 상품정보 생성하고,
    //이때 현재 사용자의 ID도 함께 저장된다.
    const product = await prisma.product.create({
        data: {
            title,
            description,
            imageSrc,
            category,
            latitude,
            longitude,
            address,
            price:Number(price),
            userId: currentUser.id
        }
    })
    //처리된 결과를 json형식으로 생성된 상품정보가 클리이언트에게 반환한다.
    return NextResponse.json(product);
}