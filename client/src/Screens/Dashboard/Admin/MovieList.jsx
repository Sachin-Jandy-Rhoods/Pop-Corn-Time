import React from 'react'
import SideBar from './SideBar'
import Table from '../../../Components/Table'
import { Movies } from '../../../Data/MoviesData'


const MovieList = () => {
  return (
    <SideBar>
        <div className='flex flex-col gap-6'>
            <div className='flex-btn gap-2'>
                <h2 className='text-xl font-bold'>Movies List</h2>
                <button className='bg-main border-2 border-subMain font-medium transitions hover:bg-subMain text-white py-3 px-6 rounded'>
                    Delete All</button>
            </div>
            <Table data={Movies} admin={true}/>
        </div>
    </SideBar>
  )
}

export default MovieList