import React from 'react'
import { FaCloudDownloadAlt } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import {MdDelete} from 'react-icons/md';
import {GoEye} from 'react-icons/go';
import { Link } from 'react-router-dom';
const Head = "text-xs text-left text-dry font-semibold px-6 py-2 uppercase";
const Text = "text-sm text-left leading-6 whitespace-nowrap px-5 py-3";



const Rows = (movie, i , admin) =>{
    return(
        <tr key={i}>
            <td className={`${Text}`}>
                <div className='w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden'>

                <img className='h-full w-full object-cover'
                src={movie?.image ? movie?.image : "/images/user.png"}
                 alt="movie.?title" />
                </div>
                
            </td>
            <td className={`${Text} truncate`}>{movie.name}</td>
            <td className={`${Text}`}>{movie.category}</td>
            <td className={`${Text}`}>{movie.language}</td>
            <td className={`${Text}`}>{movie.year}</td>
            <td className={`${Text}`}>{movie.time}hr</td>
            <td className={`${Text} float-right flex-rows gap-2`}>
                {
                    admin ? (
                        <>
                         <button className='border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2'>
                    Edit <FiEdit className='text-green-500'/>
                </button>
                <button className='bg-subMain text-white rounded flex-colo w-6 h-6 '>
                     <MdDelete/>
                </button>
                        </>
                    )
                    :(
                        <>
                         <button className='border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2'>
                    Download
                     <FaCloudDownloadAlt className='text-green-500'/>
                </button>
                <Link to={`/movie/${movie._id}`} className='bg-subMain text-white rounded flex-colo w-6 h-6 '>
                     <GoEye/>
                </Link>
                        </>
                    )
                }
               
            </td>



        </tr>
    )
}



const Table = ({data,admin}) => {
  

  return (
    <div className='overflow-x-scroll sm:overflow-hidden relative w-full'>
        <table className='w-full table-auto border-border divide-y divide-border'>
            <thead>
                <tr className='bg-dryGray'>
                    <th scope='col' className={`${Head}`}>
                        Image
                    </th>
                    <th scope='col' className={`${Head}`}>
                        Name
                    </th>
                    <th scope='col' className={`${Head}`}>
                        Category
                    </th>
                    <th scope='col' className={`${Head}`}>
                        Language
                    </th>
                    <th scope='col' className={`${Head}`}>
                        Year
                    </th>
                    <th scope='col' className={`${Head}`}>
                        Hours
                    </th>
                    <th scope='col' className={`${Head} text-end`}>
                        Action
                    </th>
                </tr>
            </thead>
            <tbody className='bg-main divide-y divide-gray-800'>
                {
                    data.map((movie,i)=>Rows(movie,i,admin))
                }
            </tbody>
        </table>
    </div>
  )
  
}

export default Table