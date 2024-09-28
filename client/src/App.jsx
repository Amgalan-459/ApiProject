import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Movie from './components/movie.jsx'
import MovieLight from './components/movieLight.jsx'
import './App.css'

let movies = []

function App() {
  const [movieName, setMovieName] = useState('')
  const [movieDate, setMovieDate] = useState(0)
  const [count, setCount] = useState(0)

  const movieNameHandler= (e) => {
    setMovieName(e.target.value);
  }
  const movieDateHandler= (e) => {
    setMovieDate(e.target.value);
  }
  const submitHandler = (e) => {
    if (movieName != ''){
      console.log(movieName + ' ' + movieDate);
      movies = []
      getData();
    }
    e.preventDefault();
  }
  const countHandler = (e) => {
    setCount(count+1);
  }


  function getData() {
    fetch(
      "http://127.0.0.1:3001/",
      {
        method: "post",
        body: JSON.stringify({
              info: `${movieName} ${movieDate}`
          }),
          headers: {
              'Content-Type': 'application/json',
            }
      }
        ).then((data) => {
          if (data.status == 200) {
            console.log('RESPONSE!');
            return data.json(); 
          }
        }).then((datajson) => {
          datajson.forEach(el => {
            movies.push(el)
          });
        })
  }
  
  return (
    <>
      <div>
        <div >
          <h1>OMDb API</h1>
          <div>
            <h3>Search by Movie Title</h3>
            <div>
                <form id="searchForm" onSubmit={e => submitHandler(e)}>
                    <input
                      value={movieName}
                      onChange={e => movieNameHandler(e)} 
                      id="searchText" type="text" placeholder=" Search movies..." />
                    <input
                      value={movieDate}
                      onChange={e => movieDateHandler(e)} 
                      type="number"id="searchYear"/>
                    <button type="submit" onClick={e => countHandler(e)}>Submit</button>
                </form>
            </div>
          </div>
        </div>

        <div class="container">
          <div id="movies">
            {
              movies.map(function (value, index, array) {
                return (<MovieLight poster={value['Poster']} title={value['Title']}/>)
              })}
          </div>
        </div>

        <h3>Count of requests: {count}</h3>
      </div>
    </>
  )
}

export default App
