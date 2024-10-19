import React, { useEffect } from 'react'
import SideBar from './SideBar'
import Table from '../../../Components/Table'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMoviesAction } from '../../../Redux/Actions/MoviesActions'
import toast from 'react-hot-toast'
import Loader from '../../../Components/Notfications/Loader'
import { Empty } from '../../../Components/Notfications/Empty'
import { TbPlayerTrackNext, TbPlayerTrackPrev } from 'react-icons/tb'


const MovieList = () => {
  const dispatch = useDispatch()
  const sameClass = "text-white p-2 rounded font-semibold border-2 border-subMain hover:bg-subMain"
  const { isLoading, isError, movies, pages, page } = useSelector(
    (state) => state.getAllMovies 
  );
  useEffect (() => {
        // errors
        if (isError) {
          toast.error(isError);
        }
    dispatch(getAllMoviesAction({}))
  }, [dispatch, isError])

    // pagination next and prev page
    const nextPage = () => {
      dispatch(getAllMoviesAction({
        pageNumber: page + 1
      }))
    }
    const prevPage = () => {
      dispatch(getAllMoviesAction({
        pageNumber: page - 1
      }))
    }

  return (
    <SideBar>
        <div className='flex flex-col gap-6'>
            <div className='flex-btn gap-2'>
                <h2 className='text-xl font-bold'>Movies List</h2>
                <button className='bg-main border-2 border-subMain font-medium transitions hover:bg-subMain text-white py-3 px-6 rounded'>
                    Delete All</button>
            </div>
            {isLoading ? (
          <Loader />
        ) : movies?.length > 0 ? (
          <>
          <Table data={movies} admin={true} />
                  {/* {Loading More} */}
        <div className="w-full flex-rows gap-6 my-5">
          <button onClick={prevPage} disabled={page ===1} className={sameClass}>
            <TbPlayerTrackPrev className="text-xl" />
          </button>
          <button onClick={nextPage} disabled={page === pages} className={sameClass}>
            <TbPlayerTrackNext className="text-xl" />
          </button>
        </div>
          </>
        ) : (
          <Empty message="You have no Movies" />
        )}
        </div>
    </SideBar>
  )
}

export default MovieList