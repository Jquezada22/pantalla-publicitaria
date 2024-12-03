import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VideoPlayer from './components/VideoPlayer';
import UploadVideo from './components/UploadVideo';

const App: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null); // Guarda la URL del video subido

  return (
    <Router>
      <Routes>
        {/* Ruta principal que muestra el formulario */}
        <Route path="/" element={<UploadVideo setVideoUrl={setVideoUrl} />} />
        
        {/* Ruta para ver el video */}
        <Route path="/video" element={<VideoPlayer videoUrl={videoUrl} />} />
      </Routes>
    </Router>
  );
};

export default App;
