import React from 'react';
import { useNavigate } from 'react-router-dom';

interface VideoPlayerProps {
  videoUrl: string | null;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  const navigate = useNavigate(); // Hook para navegación

  const handleGoBack = () => {
    navigate('/'); // Navega a la raíz del proyecto
  };

  return (
    <>
      <div className="m-3">
        {videoUrl ? (
          <video
            src={videoUrl}
            controls
            loop
            autoPlay
            style={{ width: '20%', height: '20%' }}
          />
        ) : (
          <p>No se encontró el video</p>
        )}
      </div>
      <div>
        <button
          className="bg-teal-600 text-white rounded-md m-4 px-4 py-2 font-semibold"
          onClick={handleGoBack}
        >
          Regresar
        </button>
      </div>
    </>
  );
};

export default VideoPlayer;
