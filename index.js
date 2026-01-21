const express = require('express');
const app = express();
const puerto = 3000;
const bcrypt = require('bcryptjs');

app.use(express.json())

app.get('/post/login', (req, resp) => {
    resp.send('Hola')
})

//Se marca como async para usar await
app.post('/signup', async (req, resp) => {

    // Recibe los datos
    const {username, password} = req.body;

    //Encripta la contra con bcrypt.
    const hashedPassword = await bcrypt.hash(password, 10);
    resp.send(`your name is: ${username} and your hashedPassword es: ${hashedPassword}`);
    console.log(req.body);
})


app.listen(puerto, () => {console.log(`Aplicacion viviendo en puerto: ${puerto}`)})