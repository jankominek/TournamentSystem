import React from 'react'
import { SearchWrapper } from './Search.styled'

export const Search = (props) => {

    const {onSearchChange, placeholder} = props;

    const onChange = () => {
        onSearchChange();
    }

  return (
    <SearchWrapper onChange={onChange}
                    placeholder={placeholder}
                />
  )
}
