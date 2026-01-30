const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware para leer los json que pase el body

let productos = []; // Almacena los productos sin necesitar una base de datos

app.get('/productos', (req, res) => {
    res.json(productos);
});

app.post('/productos', (req, res) => {
    const producto = req.body;
    productos.push(producto);
    res.status(201).json(producto);
});

app.put('/productos/:id', (req, res) => { // Se le puede agregar mas parametros, como :user

    // Comprobar que el body no esté vacío
    if(!req.body) {
        return res.status(400).json();

    } else {
        // Obtener el id de la petición
        const id = req.params.id;
        console.log(id);

        // Comprobar que el id existe
        if(!productos[id]) {
            console.log("paso");
            return res.status(404).json();

        } else {
            // Acceder a un elemento con el id y actualizarlo con lo que mande el body
            productos[id] = req.body;

            // Todo chido, sí se actualizó. Terminar la peticion - el servidor responde
            res.status(200).json({
                producto: productos[id] 
            })
        }
    }
})

app.delete('/productos/:id', (req, res) => {
    const id = req.params.id;

    // Comprobar que el id existe
    if(!productos[id]) {
        console.log("No está el id")
        res.status(404).send('Elemento');

    } else {
        productos.splice(id, 1);
        console.log("Sí está el id")

        // res.send("Producto eliminado");
        res.status(204).send();
    }  
});

app.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
})