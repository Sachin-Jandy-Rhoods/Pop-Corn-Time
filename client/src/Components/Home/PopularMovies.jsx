import React from 'react'
import Titles from '../Titles'
import {BsCollectionFill} from "react-icons/bs"

const PopularMovies = () => {
  return (
    <div className="my-16">
        <Titles title="Popular Movies" Icon={BsCollectionFill}/>
    </div>
  ) 
}

export default PopularMovies