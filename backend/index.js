const express = require('express');
const path = require('path');
const multer = require('multer');
const cors = require('cors');
const app = express();

// Habilitar CORS para permitir solicitudes desde el frontend
app.use(cors());

// Configuración de multer para manejar la subida de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Carpeta donde se almacenarán los videos
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Nombre original del archivo
  }
});

const upload = multer({ storage: storage });

// Servir los videos de la carpeta 'uploads' de manera estática
app.use('/videos', express.static(path.join(__dirname, 'uploads')));

// Ruta para manejar la subida de videos
app.post('/upload', upload.single('video'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No se subió ningún archivo');
  }
  console.log('Archivo subido:', req.file);
  res.send('Video subido con éxito');
});

// Iniciar el servidor en el puerto 3001
app.listen(3001, () => {
  console.log('Servidor escuchando en http://localhost:3001');
});
