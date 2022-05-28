import React, { useEffect, useState } from 'react'
import { PageingWrapper } from './PageingComponent.styled'

const ELEMENT_PER_PAGE = 3;

export const PageingComponent = ({data}) => {

    const [preparedData, setPreparedData] = useState();
    const [selectedPageNumber, setSelectedPageNumber] = useState(3);

    useEffect( () => {
        prepareDataContent();
    }, [])

    

const prepareDataContent = () => {
    const selectedData = data.slice((selectedPageNumber-1)*ELEMENT_PER_PAGE,ELEMENT_PER_PAGE*selectedPageNumber)
    console.log("preparedDAta : ", selectedData);
    setPreparedData(selectedData);
} 
    
  return (
    <PageingWrapper>

    </PageingWrapper>
  )
}
