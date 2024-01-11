import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from '@/helpers/prismadb'

//getSession: 사용자의 세션을 가져오는 비동기 함수
export async function getSession(){
    //getServerSession: 서버 측 세션 관리 함수, 사용자 세션을 가져오기 위해 사용된다.
    return await getServerSession(authOptions);
}

export default async function getCurrentUser(){
    try {
        const session = await getSession();

        //세션에서 사용자 이메일이 없으면 null반환, 로그인이 되지 않은 상태
        if(!session?.user?.email){
            return null;
        }

        //Prisma사용해 현재 사용자의 이메일을 기반으로 데이터베이스에서 사용자 찾는다.
        const currentUser = await prisma?.user.findUnique({
            where:{
                email: session.user.email
            }
        })

        //사용자가 찾아지지 않으면 null값 반환
        if(!currentUser) {
            return null;
        }

        //현재 사용자 정보 반환
        return currentUser;

    } catch (error) {
        return null;
    }
}