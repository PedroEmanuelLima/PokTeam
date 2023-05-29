import React from 'react';
import {
    Pagination,
    PaginationItem,
    PaginationLink
} from 'reactstrap';
import { IInforCurrentPage } from '../../base/Interfaces';
import { clickInType } from '../../base/Types';

interface IPaginateProps extends IInforCurrentPage {
    handleCurrentPage(clickIn: clickInType): Promise<void>
}

export default function Paginate({ current, next, previous, handleCurrentPage }: IPaginateProps) {
    return (
        <Pagination
            aria-label="Page navigation example"
            size="lg"
            className='d-flex justify-content-center mt-4'
        >
            <PaginationItem disabled={previous==null}>
                <PaginationLink
                    className='bg-warning'
                    previous
                    onClick={() => handleCurrentPage('previous')}
                />
            </PaginationItem>

            <PaginationItem active>
                <PaginationLink>
                    {current}
                </PaginationLink>
            </PaginationItem>

            <PaginationItem disabled={next==null}>
                <PaginationLink
                    className='bg-warning'
                    next
                    onClick={() => handleCurrentPage('next')}
                />
            </PaginationItem>
        </Pagination >
    )
}