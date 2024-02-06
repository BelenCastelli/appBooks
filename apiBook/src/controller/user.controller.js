const {pool} = require('../database')

const getStart = async (req, res) => {
    let respuesta = {error: false, 
                     code:200,
                     message: 'punto de inicio'}
    res.send(respuesta);
}
const postUsers = async (req, res) =>{
    try {
        let respuesta;
        let email = [req.body.email]
        let emailExist = `SELECT user.email FROM user WHERE user.email = ?`

        let [emailResult] = await pool.query(emailExist, email)
        
        if(emailResult.length > 0){
            respuesta = 'El correo proporcionado ya está registrado'
        }

        else {
            let params = [req.body.name, req.body.last_name,
                          req.body.email, req.body.photo,
                          req.body.password]

            let newUser = 'INSERT INTO user (name, last_name, email, photo, password) VALUES (?, ?, ?, ?, ?)';
    
            let [result] = await pool.query(newUser, params);
    
            if (result.insertId) 
                respuesta = String(result.insertId); 
            else 
                respuesta = '-1'
        }
    res.send(respuesta)
     
    } catch (err) {
        console.log(err);
        res.status(500).send('Error interno del servidor');
    }
} 

const login = async (req, res) => {
    try
    {
        let respuesta;
        let params = [req.body.email, req.body.password]
        let userExist = `SELECT user.name, user.last_name, user.email, user.photo FROM appbooks.user
        WHERE user.email = ? AND user.password = ?`

      
        let [result] = await pool.query(userExist, params);
        if(result.length == 0)
            respuesta = 'Los datos son incorrectos o el usuario no existe'
        else {
             respuesta = result
        }
        res.send(respuesta)
    }

    catch(err)
    {
        console.log(err);
        res.status(500).send('Error interno del servidor');
    }
}

module.exports = {getStart, postUsers, login}