import React from 'react';
import { Link } from "react-router-dom"

function movieLight({poster, title, id}) {
  return <div>
    <div class="col-md-3">
                 <div class="text-center">
                  <img src={poster} class="img-fluid mt-4"/>
                   <h5 class="text-white pt-3">{title}</h5>
                   <Link to={"/MovieDetails/" + id}>Movie Details</Link>
                 </div>
                </div>
  </div>;
}

export default movieLight;
