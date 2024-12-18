import express from 'express';
import categorias from './modulos/categorias/ruta.js';
import productos from './modulos/productos/ruta.js';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use(express.json());
//configuración del puerto
app.set('port', 4000);

//rutas
app.use('/api/categorias', categorias);
app.use('/api/productos', productos);

export default app;