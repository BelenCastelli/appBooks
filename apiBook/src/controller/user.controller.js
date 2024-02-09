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
            respuesta = {error: true, codigo: 200, mensaje:'El correo proporcionado ya está registrado'}
        }

        else {
            let params = [req.body.name, req.body.last_name,
                          req.body.email, req.body.photo,
                          req.body.password]

            let newUser = 'INSERT INTO user (name, last_name, email, photo, password) VALUES (?, ?, ?, ?, ?)';
    
            let [result] = await pool.query(newUser, params);
                respuesta = {error: false, codigo: 200, mensaje:'Usuario registrado correctamente', data: [String(result.insertId)]}; 
         
        }
    res.json(respuesta)
     
    } 
    
    catch (err) 
    {
        console.log(err);
        res.status(500).send('Error interno del servidor');
    }
} 

const login = async (req, res) => {
    try
    {
        let respuesta;
        let params = [req.body.email, req.body.password]
        let userExist = `SELECT user.id_user, user.name, user.last_name, user.email, user.photo FROM appbooks.user
        WHERE user.email = ? AND user.password = ?`

      
        let [result] = await pool.query(userExist, params);
        if(result.length == 0)
            respuesta = {error:true, codigo: 200, mensaje: 'Los datos son incorrectos o el usuario no existe'}
           
        else 
            respuesta = {error:false, codigo: 200, mensaje: 'Ha iniciado sesión correctamente', usuario: result[0]}
            console.log(result[0]);

    res.json(respuesta)

    }

    catch(err)
    {
        console.log(err);
        res.status(500).send('Error interno del servidor');
    }
}

const putUser = async (req, res) => {

    let respuesta; 

    let params = [req.body.name, req.body.last_name, req.body.email,
                    req.body.photo, req.body.password, req.body.id_user]
    console.log(params);

    let putUser = `UPDATE user SET name = COALESCE (?, name), 
                                    last_name = COALESCE (?, last_name),
                                    email = COALESCE (?, email),
                                    photo = COALESCE (?, photo),
                                    password = COALESCE (?, password)
                                    WHERE id_user = ?`
    console.log(putUser);
    
    let [result] = await pool.query(putUser, params)
    console.log(result);
    respuesta = {error: false, codigo:200, mensaje: 'datos modificados correctamente', data: [result]}
    
    res.json(respuesta)
}

module.exports = {getStart, postUsers, login, putUser}