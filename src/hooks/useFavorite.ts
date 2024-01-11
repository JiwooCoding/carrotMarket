import {  User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import {toast} from 'react-toastify'


interface useFavoriteProps {
    productId:string;
    currentUser?:User | null;
}

const useFavorite = ({productId, currentUser}:useFavoriteProps) => {
    
    const router = useRouter();

    const hasFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return list.includes(productId);
    }, [currentUser,productId])

    const toggleFavorite = async(e:React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        
        //로그인이 되어 있지 않으면 그냥 return
        if(!currentUser){
            toast.warn('먼저 로그인을 해주세요')
            return;
        }

        //로그인이 되어있을 경우
        try {
            let requset;
            let successMessage;
            //좋아요가 눌러져있을 경우 해제
            if(hasFavorite) {
                requset = () => axios.delete(`/api/favorites/${productId}`)
                successMessage='좋아요가 취소되었습니다';
            //좋아요가 눌러져있지 않을 경우 좋아요 생성
            } else{
                requset = () => axios.post(`/api/favorites/${productId}`)
                successMessage='좋아요를 누르셨습니다';
            }

            await requset();
            router.refresh(); //'좋아요' 화면에 반영하기 위해서
            toast.success(successMessage);

        } catch (error) {
            console.log(error);
            toast.error('실패했습니다.')
        }
    }

    return {hasFavorite, toggleFavorite}
}

export default useFavorite;