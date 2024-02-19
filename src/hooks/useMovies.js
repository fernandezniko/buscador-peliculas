import { useRef, useState, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/moviesService'

export function useMovies(search, sortMovie){

    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const previouseSearch = useRef(search)

    const getMovies = useCallback( async (search) => {
        //search es ''
        if(search === previouseSearch.current)
            return

        try{
            setLoading(true)
            setError(null)
            previouseSearch.current = search
            const newMovies = await searchMovies(search)
            setMovies(newMovies)
        }
        catch(err){
            setError(err.message)
        }
        finally{
            setLoading(false)
        }
    }, [])
    
    const sortedMovies = useMemo(() => {
        return sortMovie ? 
           [...movies].sort((a,b) => a.title.localeCompare(b.title))
           : movies
    }, [sortMovie, movies])

    return { movies: sortedMovies, getMovies, loading}
}