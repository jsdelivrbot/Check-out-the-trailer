import React from 'react'
import VideoListItem from '../components/video-list-item'

const VideoList = (props) => {
    const {movieList} = props;
    return (
        <div>
            <ul>
                {
                    movieList.map(movie => {
                        return <VideoListItem key={movie.id} movie={movie} callback={receiveCallBack}/>
                    })
                }
            </ul>
        </div>
    );

    // LA FONCTION RECOIT LE MOVIE DE L'ENFANT
    // QUI LE RENVOIE A SON PROPRE PARENT (APPS) DANS LA PROPS
    function receiveCallBack(movie) {
      props.callback(movie);
    }
}

export default VideoList;