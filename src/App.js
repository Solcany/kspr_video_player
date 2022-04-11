import VideoElement from './components/VideoElement/VideoElement'
import './App.css';

import video from './data/video.mp4'
import poster from './data/poster.jpg'
import response from './data/response.json'

function App() {
  return (
    <div>
      <VideoElement objectsData={response} src={video} poster={poster} width="1280" height="720" autoplay={false}/>
    </div>
  );
}

export default App;
