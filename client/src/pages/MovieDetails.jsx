import { useParams } from 'react-router'
import { Link } from 'react-router-dom';
import { useState } from 'react'

let movie = "nothing yet";

function MovieDetails() {
    const params = useParams();
    const [name, setName] = useState('')

    const nameChangeHandler = (e) => {
        setName(e.target.value)
    }

    function GetMovie() {
        fetch(`https://www.omdbapi.com/?&apikey=db5f16ed&i=${params.id}`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            //console.log(data)

            console.log('Title: ', data['Title'])
            movie = data;

            setName('some_user')
        })
    }

    GetMovie();

    // return(
    //     <div>            
    //         <h3>Loadint data...</h3>
    //         <Link to="/">Back to search</Link>
    //     </div>
    // )
    console.log('movie: ', movie)

    return (
        <>
            <div>
                <div class="row">
                <div >
                <img src={movie['Poster']} />
                </div>
                    <div>
                    <h2  >{movie['Title']}</h2>
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Released:</strong>{movie['Released']}</li>
                        <li class="list-group-item"><strong>IMDB Rating:</strong>{movie['imdbRating']}</li>
                        <li class="list-group-item"><strong>Director:</strong>{movie['Director']}</li>
                        <li class="list-group-item"><strong>Actors:</strong>{movie['Actors']}</li>
                    </ul>
                    </div>
                </div>
    
                <div class="row">
                    <div >
                        <h2>Plot</h2>
                        <p>{movie['Plot']}</p>
                        <Link to="/">Back to search</Link>
                    </div>
                </div>

                <div>
                    <label >Your name:
                        <input type="text" onChange={e => nameChangeHandler(e)}/>
                    </label>
                </div>
            </div>
        </>
    )
}

export default MovieDetails;