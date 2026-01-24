const express = require('express');
const app = express();
const puerto = 3000;
const bcrypt = require('bcryptjs'); //encriptar password (npm install bcryptjs)
const singupSchema = require("./validadores"); //Importamos el validador de (joi)
const Usuarios = require('./dominio/Entity/usuarioSchema');//Conexion con la base de datos
const { ConnectionRefusedError } = require('sequelize');
require('dotenv').config();


app.use(express.json())


//GET SIGN IN
app.get('/post/login', (req, resp) => {
    resp.send('Hola')
})


//POST SIGN UP
app.post('/signup', async (req, resp) => {

    const { error, value } = singupSchema.validate(req.body, { abortEarly: false}); //ESQUEMA VALIDADOR 
    
    //RETURNA ERROR EN CASO DE QUE EL VALIDADOR TENGA ALGUNO.
    if(error) {
        const mensajes = error.details.map(err => err.message)
        return resp.status(400).json({ errores: mensajes})
    }

    const{ username, password, email} = value


    const hashedPassword = await bcrypt.hash(password, 10); //Encripta la contra con bcrypt.


    try{
        //insercion de Sequelize
        const nuevoUsuario = await Usuarios.create({
            nombre: username,
            hashedPassword: hashedPassword,
            correo: email
        });

        return resp.status(201).json({ mensaje: "Usuario creado correctamente", id: nuevoUsuario.id})

    } catch(err){
        console.error(err);
        return resp.status(500).json({ error: "Error al guardar en la base de datos"});
    }

    
   

})




app.listen(puerto, () => {console.log(`Aplicacion viviendo en puerto: ${puerto}`)})