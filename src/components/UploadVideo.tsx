import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface UploadVideoProps {
  setVideoUrl: React.Dispatch<React.SetStateAction<string | null>>;
}

const UploadVideo: React.FC<UploadVideoProps> = ({ setVideoUrl }) => {
  const [video, setVideo] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [videoUrl, setVideoUrlState] = useState<string | null>(null); // Guardar la URL del video
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setVideo(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!video) {
      setErrorMessage('Por favor selecciona un video para subir.');
      return;
    }

    const formData = new FormData();
    formData.append('video', video);

    try {
      await axios.post('http://localhost:3001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Una vez que el video se haya subido, generamos la URL del video
      const uploadedVideoUrl = `http://localhost:3001/videos/${video.name}`;
      setVideoUrl(uploadedVideoUrl); // Guardar la URL en el estado global
      setVideoUrlState(uploadedVideoUrl); // Guardar la URL temporalmente

      // Redirigir a la página de video en el frontend, pasando la URL del video como parámetro
      navigate(`/video`, { state: { videoUrl: uploadedVideoUrl } });
    } catch (error) {
      setErrorMessage('Hubo un error al subir el video');
    }
  };

  return (
    <div className='m-5'>
      <h1 className='mx-10 text-2xl'>Sube tu Video</h1>
      <input type="file" onChange={handleFileChange} />
      <button className='m-3 p-2 bg-gray-300 rounded font-semibold' onClick={handleUpload}>Subir Video</button>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default UploadVideo;
