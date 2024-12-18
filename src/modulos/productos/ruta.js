import express from 'express';
import pool from "../../config.js";

const router = express.Router();

//listar productos

router.get('/', async(req, res) => {
    try {
        const [result] = await pool.query('select * from productos')
        res.send(result);
    } catch (error) {
        console.log('Error al listar');
        res.status(404).send("Error al listar los productos");

    }
})

//crear productos

router.post('/', async(req, res) => {
    try {
        const { nombre, precio, stock, fecha_vencimiento, id_categoria } = req.body
        await pool.query('insert into productos(nombre,precio,stock,fecha_vencimiento,id_categoria) values(?,?,?,?,?)', [nombre, precio, stock, fecha_vencimiento, id_categoria])
        res.json({
            message: 'Producto creado con éxito'
        })
    } catch (error) {
        console.log('Error al crear', error);
        res.status(500).send('Error al crear un producto');
    }
});

//actualizar productos

router.patch('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const { nombre, precio, stock, fecha_vencimiento, id_categoria } = req.body
        await pool.query('update productos set nombre =?,precio=?,stock=?,fecha_vencimiento=?,id_categoria=? where id=?', [nombre, precio, stock, fecha_vencimiento, id_categoria, id])
        res.json({
            message: 'Producto actualizado correctamente'
        })
    } catch (error) {
        console.log('Eror al actualizar', error);
        res.status(500).send("Eror al actualizar un producto");
    }
});

//eliminar productos
router.delete('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        await pool.query('delete from productos where id=?', [id])
        res.json({
            message: 'Producto eliminado con éxito',
            data: { id }
        })
    } catch (error) {
        console.log('Eror al eliminar', error);
        res.status(500).send("Error al eliminar el producto");
    }
});


//listar productos por categoría
router.get('/:idCategoria', async(req, res) => {
    try {
        const { idCategoria } = req.params;
        const [result] = await pool.query('select * from productos where id_categoria = ?', [idCategoria]);
        res.send(result);
    } catch (error) {
        console.log('error al listar productos por categoria', error);
        res.status(404).send('Error al listar productos')
    }
});


export default router;