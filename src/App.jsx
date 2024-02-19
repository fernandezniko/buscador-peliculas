import './App.css'
import Movies from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useState, useEffect, useRef, useCallback } from 'react'
import debounce from 'just-debounce-it'

function useSearch(){

  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstRenderInput = useRef(true)

  useEffect(() => {

    if(isFirstRenderInput.current){
      isFirstRenderInput.current = search === ''
      return
    }

    if(search === ''){
      setError('No se puede buscar una pelicula vacia.')
      return
    }

    if(search.length < 3){
      setError('La busqueda debe tener al menos 3 caracteres.')
      return
    }

    if(search.match(/^\d+$/)){
      setError('No se puede buscar una pelicula con un numero.')
      return
    }

    setError(null)

  }, [search])

  return {search, setSearch, error}

}

function App() {
  
  const { search, setSearch, error } = useSearch()
  const [sortMovie, setSortMovie] = useState(false)
  const { movies, getMovies, loading } = useMovies(search, sortMovie)

  const debouncedGetMovies = useCallback(
    debounce(search => {
      getMovies(search)
    }, 500)
    ,[getMovies])
  
  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies(search)
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    setSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  const handleCheck = (e) => {
    setSortMovie(!sortMovie)
  }

  return (
    <div className='page'>

      <header>
          <h1>Buscador de peliculas</h1>
          <form onSubmit={handleSubmit} className='form'>
            <input value={search} onChange={handleChange} type='text' placeholder='Avengers, The Matrix, Star wars...'
            style={{border: '1px solid transparent', borderColor: error ? 'red' : 'transparent'}}/>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <input type='checkbox' value={sortMovie} onChange={handleCheck}/>
            <button type='submit'>Buscar</button>
          </form>
      </header>

      <main>
        {
          loading ? <p>cargando...</p> 
          :
          <Movies movies={movies}/>
      }
      </main>

    </div>
  )
}

export default App
