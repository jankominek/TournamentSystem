import React, { useEffect, useState } from 'react'
import { PageingWrapper, PagingElement, PagingWrapper } from './PageingComponent.styled'

const ELEMENT_PER_PAGE = 2;

export const PageingComponent = ({data, onPageChange}) => {

    const [originalData, setOriginalData] = useState();

    useEffect( () => {
        data && setOriginalData(data);
        data && onPageChange(prepareDataContent(1));
    }, [data])
    const prepareDataContent = (selectedPageNumber) => {
        const selectedData = originalData?.slice((selectedPageNumber-1)*ELEMENT_PER_PAGE,ELEMENT_PER_PAGE*selectedPageNumber)
        return selectedData;
    } 

    const onPageClick = (e) => {
        const pageValue = e.target.id;
        const dataToReturn = prepareDataContent(pageValue);
        onPageChange(dataToReturn);
    }

    const pagingList = data && Array(Math.ceil(data.length/ELEMENT_PER_PAGE)).fill(0).map((_, i) => <PagingElement onClick={onPageClick} id={i+1}>{i+1}</PagingElement>);

  return (
    <PagingWrapper>
        {pagingList}
    </PagingWrapper>
  )
}
