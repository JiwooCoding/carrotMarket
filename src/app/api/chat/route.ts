import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/helpers/prismadb'

export async function GET(request:Request) {
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }

    const users = await prisma.user.findMany({
        include:{
            conversations:{
                include:{
                    message:{
                        include:{
                            sender: true,
                            receiver: true
                        },
                        orderBy:{
                            createdAt:'asc'
                        }
                    },
                    users:true
                }
            }
        }
    })

    return NextResponse.json(users)
}


export async function POST(request:Request) {
    
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();

    //이미 둘이 대화한 conversation이 있는지 찾기
    const conversation = await prisma.conversation.findFirst({
        where:{
            AND:[
                {
                    users: {
                        some:{
                            id: body.senderId
                        }
                    }
                },
                {
                    users: {
                        some:{
                            id: body.receiverId
                        }
                    }
                }
            ]
        }
    })

    if(conversation){
        //이미 둘이 대화를 한 conversation이 있다면 Message만 생성하기
        try {
            const message = await prisma.message.create({
                data:{
                    text: body.text,
                    image: body.image,
                    senderId: body.senderId,
                    receiverId: body.receiverId,
                    conversationId: conversation.id
                }
            })

            return NextResponse.json(message)

        } catch (error) {
            return NextResponse.json(error);
        }
    } else{
        //둘이 처음 대화하는 거라면 conversation, message 둘 다 생성해줘야 함
        const newConversation = await prisma.conversation.create({
            data:{
                senderId: body.senderId,
                receiverId: body.receiverId,
                users:{
                    connect: [
                        {
                            id: body.senderId
                        },
                        {
                            id: body.receiverId
                        }
                    ]
                }
            }
        })

        try {
            const message = await prisma.message.create({
                data:{
                    text: body.text,
                    image: body.image,
                    senderId: body.senderId,
                    receiverId: body.receiverId,
                    conversationId: newConversation.id
                }
            })

            return NextResponse.json(message)

        } catch (error) {
            return NextResponse.json(error);
        }

    }
}