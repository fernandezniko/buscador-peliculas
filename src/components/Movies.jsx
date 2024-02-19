const ListOfMovies = ({ movies }) => {

    return (
          <ul className='movies'>
            {
              movies.map((movie) => (
                <li key={movie.id} className="movie">
                  <h1>{movie.title}</h1>
                  <p>{movie.year}</p>
                  <img alt={`A poster image of the film ${movie.title}`} src={movie.poster}/>
                </li>
              ))
            }
          </ul>
        )     
}

const NoMoviesResult = () => {

    return (
        <p>No se encontraron peliculas para esta busqueda.</p>
    )
}

const Movies = ({movies}) => {

    const hasMovies = movies?.length > 0
    
    return (
        hasMovies ? 
         <ListOfMovies movies={movies}/>
        :
         <NoMoviesResult/>
    )
}

export default Movies;