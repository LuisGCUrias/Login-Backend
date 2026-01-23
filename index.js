const express = require('express');
const app = express();
const puerto = 3000;
//encriptar contras (npm install bcryptjs)
const bcrypt = require('bcryptjs');
const singupSchema = require("./validadores"); //Importamos el validador de (joi)
const pool = require("./databaseConection");

app.use(express.json())


//GET SIGN IN
app.get('/post/login', (req, resp) => {
    resp.send('Hola')
})


//POST SIGN UP
//Se marca como async para usar await
app.post('/signup', async (req, resp) => {

    // Recibe los datos

    const { error, value } = singupSchema. validate(req.body, { abortEarly: false});
    
    if(error) {
        const mensajes = error.details.map(err => err.message)
        return resp.status(400).json({ errores: mensajes})
    }

    const{ username, password, email} = value


    //Encripta la contra con bcrypt.
    const hashedPassword = await bcrypt.hash(password, 10);


    try{
        const[rows] = await pool.query(
            "INSERT INTO pruebaUsers (username, hashed_password, correo) VALUES (?, ?, ?)",
            [username, hashedPassword, email]
        );

        return resp.status(201).json({ mensaje: "Usuario creado exitosamente", id: rows.insertId});
    } catch(err){
        console.error(err);
        return resp.status(500).json({ error: "Error al guardar en la base de datos"});
    }

    
    

})


app.listen(puerto, () => {console.log(`Aplicacion viviendo en puerto: ${puerto}`)})