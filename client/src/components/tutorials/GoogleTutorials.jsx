import React, { useState } from "react";
import "./tutorial.css";
    
    const GoogleTutorials = () => {
      const [searchTerm, setSearchTerm] = useState("");
      const [videos, setVideos] = useState([]);
      const [selectedVideo, setSelectedVideo] = useState(null); // state to keep track of selected video
    
      const fetchYouTubeVideos = async () => {
        if (!searchTerm) return;
    
        const query = encodeURIComponent(`${searchTerm} farming tutorial`);
        const apiKey = import.meta.env.VITE_APP_GOOGLE_KEY;   //get API from https://console.cloud.google.com/apis/
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${apiKey}&maxResults=20&type=video`
        );
    
        const data = await response.json();
        setVideos(data.items);
      };
    
      const handleSelectVideo = (videoId) => {
        setSelectedVideo(videoId); // set the selected video ID
      };
    
      const handleCloseVideo = () => {
        setSelectedVideo(null); // reset selected video when closed
      };
    
      return (
        <div className="tutorials-container min-h-screen">
          <h2>Search Crop or Animal By Name</h2>
          <div className="search-bar">
            <input
              type="text"
              placeholder=" Type here..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={fetchYouTubeVideos}>Search</button>
          </div>
    
          <div className="videos">
            {videos.map((video) => (
              <div
                key={video.id.videoId}
                className={`video-card ${selectedVideo === video.id.videoId ? "selected" : ""}`}
              >
                {selectedVideo === video.id.videoId ? (
                  // When a video is selected, make it larger
                  <div className="selected-video">
                    <button onClick={handleCloseVideo}>Close Video</button>
                    <iframe
                      width="800"
                      height="800"
                      src={`https://www.youtube.com/embed/${video.id.videoId}`}
                      title={video.snippet.title}
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  // Default size for unselected videos
                  <div className="thumbnail-video" onClick={() => handleSelectVideo(video.id.videoId)}>
                    <iframe
                      width="300"
                      height="300"
                      src={`https://www.youtube.com/embed/${video.id.videoId}`}
                      title={video.snippet.title}
                      allowFullScreen
                    ></iframe>
                    <p>{video.snippet.title}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    };
    
    export default GoogleTutorials;
    