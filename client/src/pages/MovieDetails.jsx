import { useParams } from 'react-router'
import { Link } from 'react-router-dom';
import { useState } from 'react'

let movie = "nothing yet";



function MovieDetails() {
    const params = useParams();
    const [name, setName] = useState('')
    const [comment, setComment] = useState('')

    const nameChangeHandler = (e) => {
        setName(e.target.value)
    }
    const commentHandler = (e) => {
        setComment(e.target.value);
    }
    const submitHandler = (e) => {
        if (name != '' && comment != '') {
            fetch(
                "http://127.0.0.1:3001/Comment",
                {
                method: "post",
                body: JSON.stringify({
                        movieId: `${params.id}`,
                        userName: name,
                        com: comment
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
                    console.log(datajson)
                })
        }
        setName('')
        setComment('')
        e.preventDefault();
    }


    

    GetMovie(); //здесь лишний раз запршивает

    // return(
    //     <div>            
    //         <h3>Loadint data...</h3>
    //         <Link to="/">Back to search</Link>
    //     </div>
    // )
    //console.log('movie: ', movie)

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
                    <form onSubmit={e => submitHandler(e)} method='post'>
                        <label >Your name:
                            <input type="text" onChange={e => nameChangeHandler(e)}/>
                        </label>
                        <label>Comment: 
                            <input type="text" onChange={e => commentHandler(e)}/>
                        </label>
                        <button type='submit'>Send</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default MovieDetails;