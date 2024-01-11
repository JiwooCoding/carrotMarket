'use client'
import React from 'react'
import usePagination from '@lucasmogari/react-pagination'
import PaginationLink from './PaginationLink';
import { IoIosArrowBack, IoIosArrowForward  } from "react-icons/io";

interface PaginationProps {
    page: number;
    totalItems: number;
    perPage:number;
}

const Pagination = ({page, totalItems, perPage}:PaginationProps) => {

    const {getPageItem, totalPages, fromItem, toItem} = usePagination({
        totalItems: totalItems,
        page: page,
        itemsPerPage: perPage,
        maxPageItems: 3
    })

    const firstPage = 1;

    const nextPage = Math.min(page+1, totalPages);
    const prevPage = Math.max(page-1, firstPage);
    //+2: < 1,2,3 > '<','>' 화살표
    const arr = new Array(totalPages + 2);

  return (
    <div className='flex items-center justify-center gap-2 mt-4'>
        {[...arr].map((_,i) => {
            const {page, disabled, current} = getPageItem(i);
            console.log('page, disabled, current',page, disabled, current)
            
            if(page === 'previous'){
                return (<PaginationLink 
                            key={i}
                            page={prevPage}
                            disabled={disabled}><IoIosArrowBack/></PaginationLink>)
            }
            
            if(page === 'next'){
                return (<PaginationLink 
                            key={i}
                            page={nextPage}
                            disabled={disabled}><IoIosArrowForward/></PaginationLink>)
            }

            if(page === 'gap'){
                return (<PaginationLink key={i}>...</PaginationLink>)
            }

            return (<PaginationLink key={i} active={current} page={page}>{page}</PaginationLink>)
        })}
    </div>
  )
}

export default Pagination