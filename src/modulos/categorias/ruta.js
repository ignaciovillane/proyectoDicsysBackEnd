import express from 'express';
import pool from '../../config.js';

const router = express.Router();

//listar categorias
router.get('/', async(req, res) => {
    try {
        const [result] = await pool.query('select * from categorias')
        res.send(result);
    } catch (error) {
        console.log("Error al listar", error);
        res.status(404).send('Error al listar las categorias')

    }
});

export default router;