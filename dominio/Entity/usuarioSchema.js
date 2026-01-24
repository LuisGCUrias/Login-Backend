const { DataTypes } = require('sequelize'); 
const sequelize = require('../../Infrastructure/dataBase/dbConnection'); // tu archivo de conexión

const Usuarios = sequelize.define('pruebaUsers', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    hashed_password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    correo: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
});

module.exports = Usuarios;