import React from 'react'

const BASE_URL = "https://www.youtube.com/embed/";

const Video = ({videoId}) => {
    console.log("VIDEO URL", `${BASE_URL}${videoId}`)

    return(
        
        <div className="embed-responsive embed-responsive-16by9">
            <iframe className="embed-responsive-item" src={`${BASE_URL}${videoId}`}/>
        </div>
    )
}

export default Video;