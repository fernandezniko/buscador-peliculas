const BASE_URL = 'https://www.omdbapi.com/?'
const API_KEY = 'f443da60'

export const searchMovies = async (search) => {

    if(search === '')
        return null

    try{
        const moviesResponse = await fetch(`${BASE_URL}apikey=${API_KEY}&s=${search}`)
        const moviesJson = await moviesResponse.json()
        
        const movies = moviesJson.Search
        return movies.map(movie => (
            {
                id: movie.imdbID,
                title: movie.Title,
                year: movie.Title,
                poster: movie.Poster
            }
        ))  
    }
    catch(e){
        throw new Error('Error searchMovies')
    }
    
}