import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { SearchWrapper } from './Search.styled'

export const Search = (props) => {

    const {onSearchChange, placeholder} = props;

    const [data, setData] = useState([]);

    const tournaments = useSelector(state => state.tournaments.tournaments);

    useEffect( () => {
        setData(tournaments);
    }, [])

    const onChange = (e) => {
        const tourName = e.target.value;
        const selectedTournaments = data.filter( (tour) => tour.name.includes(tourName));
        if(tourName === ""){
          onSearchChange(tournaments);
        }else{
          onSearchChange(selectedTournaments);
        }
    }

  return (
    <SearchWrapper onChange={onChange}
                    placeholder={placeholder}
                />
  )
}
