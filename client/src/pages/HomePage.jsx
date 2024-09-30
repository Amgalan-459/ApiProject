import { useState, useReducer, act } from 'react'
import MovieLight from '../components/movieLight.jsx'


let movies = []

function countReducer(state, action) {
  return action.c;
}

function formReducer(state, action) {
  return action.val;
}

function HomePage() {
  const [movieName, dispatchName] = useReducer(formReducer, '')
  const [movieDate, dispatchDate] = useReducer(formReducer, 0)
  const [count, dispatchC] = useReducer(countReducer, 0)

  const submitHandler = (e) => {
    if (movieName != ''){
      console.log(movieName + ' ' + movieDate);
      movies = []
      getData();
    }
    e.preventDefault();
  }
  const movieNameHandler = (e) => {
    dispatchName({
      val: e.target.value
    })
  }
  const movieDateHandler = (e) => {
    dispatchDate({
      val: e.target.value
    })
  }
  const countHandler = (e) => {
    dispatchC({
      c: count+1
    })
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
          dispatchName({
            val: ''
          })
          dispatchDate({
            val: 0
          })
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
          <h5>Founded {movies.length} results</h5>
          <div id="movies">
            {
              movies.map(function (value, index, array) {
                return (<MovieLight poster={value['Poster']} title={value['Title']} id={value['imdbID']}/>)
              })}
          </div>
        </div>

        <h3>Count of requests: {count}</h3>
      </div>
    </>
  )
}

export default HomePage
