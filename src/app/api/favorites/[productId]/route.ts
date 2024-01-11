import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

interface Params {
    productId?: string;
}

export async function POST(request: Request, {params}:{params:Params}) {
    const currentUser = await getCurrentUser();

    //로그인이 되어 있지 않을 경우 에러 발생
    if(!currentUser) {
        return NextResponse.error();
    }

    const {productId} = params;

    if(!productId || typeof productId !== 'string') {
        throw new Error('Invalid ID');
    }

    //기존에 있는 current.favoriteIds
    let favoriteIds = [...(currentUser.favoriteIds || [])];

    //기존에 있는 current.favoriteIds에 새로운 productId 추가한 모습
    favoriteIds.push(productId);

    const user = await prisma?.user.update({
        where:{
            id: currentUser.id
        },
        data:{
            favoriteIds: favoriteIds
        }
    })

    return NextResponse.json(user);
}


export async function DELETE(request:Request, {params}: {params:Params}) {
    
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }

    const {productId} = params;

    if(!productId || typeof productId !== 'string') {
        throw new Error('Invalid ID');
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds = favoriteIds.filter((id) => id !== productId)

    const user = await prisma?.user.update({
        where:{
            id: currentUser.id
        }, 
        data: {
            favoriteIds: favoriteIds
        }
    })

    return NextResponse.json(user);
}