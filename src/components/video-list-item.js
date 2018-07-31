import React from 'react'

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500/";

const VideoListItem = (props) => {
    let {movie} = props;
    return <li className="list-group-item" onClick={handleOnClick}>
        <div className="media">
          <div className="media-left">
              <img className="media-object img-rounded" width="100px" src={`${IMAGE_BASE_URL}${movie.poster_path}`}/>
          </div>
          <div className="media-body">
            <h5 className="title_list_item">{movie.title}</h5>
          </div>
        </div>
        </li>

        // FONCTION QUI PERMET D'ENVOYER LA PROPS A L'ELEMENT PARENT
        // ONCLICK SUR LE FILM LANCE LA FONCTION
        // ET TRANSFERT MOVIE À LA CONST CRÉÉ DANS PARENT (CONTAINER VIDEO LIST) NOMÉ CALLBACK
        function handleOnClick() {
          props.callback(movie);
        }
} 

export default VideoListItem;