const {pool} = require('../database')

const getBooks = async (req,res) => {
    let respuesta; 
    let param = [req.params.id_user]
    let books = `SELECT * FROM appbooks.book WHERE id_user = ?`

    let [result] = await pool.query(books, param)
    console.log(result);

    if(books != null){
        respuesta = {error: false, codigo:200, data: [result]}
    } else {
        respuesta = {error: true, codigo:200, mensaje: 'No existen libros'}
    }
    res.json(respuesta)
    }


const getBooksId = async (req, res) => {
    let respuesta; 
    let params = [req.params.id_user, req.params.id_book]
    let book = `SELECT * FROM appbooks.book WHERE id_user = ? AND id_book = ?`

    let [result] = await pool.query(book,params)
    console.log(result);
    if(result.length > 0){
        respuesta = {error: false, codigo:200, data: [result]}
    } else {
        respuesta = {error: true, codigo:200, mensaje: 'No existe el libro'}
    }
    res.json(respuesta)   
}

const postBooks = async (req, res) => {
    let respuesta; 

    let reqExist = [req.body.id_user, req.body.title, req.body.type, 
        req.body.author, req.body.price]
    
    let existQuery = `SELECT * FROM appbooks.book 
                WHERE id_user = ? AND title = ? AND type = ? AND author = ? AND price = ?`
    
    let [exist] = await pool.query(existQuery, reqExist)

    if(exist.length > 0){
        respuesta = {error: true, codigo:200, mensaje: 'Ya existe el libro'}
    } else 
    {
        
        let params = [req.body.id_user, req.body.title, req.body.type, 
                    req.body.author, req.body.price, req.body.photo]

        let newBook = 'INSERT INTO book (id_user, title, type, author, price, photo) VALUES (?, ?, ?, ?, ?, ?)'
        
        let [result] = await pool.query(newBook, params)

        respuesta = {error: false, codigo:200, data: [result]}
    }


    res.json(respuesta)

}
module.exports = {getBooks, getBooksId, postBooks}