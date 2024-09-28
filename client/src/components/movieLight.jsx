import React from 'react';

function movieLight({poster, title}) {
  return <div>
    <div class="col-md-3">
                 <div class="text-center">
                  <img src={poster} class="img-fluid mt-4"/>
                   <h5 class="text-white pt-3">{title}</h5>
                   <a href="#">Movie Details</a>
                 </div>
                </div>
  </div>;
}

export default movieLight;
