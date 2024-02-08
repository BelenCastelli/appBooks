const {pool} = require('../database');


const getBooks = async (req,res) => {
    let respuesta; 
    let param = [req.params.id_user]
    let books = `SELECT * FROM appbooks.book WHERE id_user = ?`

    let [result] = await pool.query(books, param)
    console.log(result);

    if(result != null){
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

        respuesta = {error: false, codigo:200, mensaje: 'Libro añadido correctamente', data: [result]}
    }


    res.json(respuesta)

}

const putBook = async (req, res ) =>{
    let respuesta; 

    let params = [req.body.title, req.body.type, 
        req.body.author, req.body.price, req.body.photo, 
        req.body.id_book, req.body.id_user]

    let putBook = `UPDATE book SET title = COALESCE (?, title), 
                                    type = COALESCE (?, type),
                                    author = COALESCE (?, author),
                                    price = COALESCE (?, price),
                                    photo = COALESCE (?, photo)
                                        WHERE id_book = ? AND id_user = ?`
     let [result] = await pool.query(putBook, params)
 
    if(result.affectedRows == 0) 
        respuesta = {error: true, codigo:200, mensaje: 'No se ha encontrado el libro'}
    else 
        respuesta = {error: false, codigo:200, mensaje: 'Libro modificado correctamente', data: [result]}

     res.json(respuesta)
}

const deleteBook = async (req, res) => {
    let respuesta; 

    let param = [req.body.id_book]

    let deleteBook = `DELETE FROM book WHERE id_book = ?`

     let [result] = await pool.query(deleteBook, param)

        if(result.affectedRows == 0)
            respuesta = {error: true, codigo:200, mensaje: 'No se ha encontrado el libro'}
        else 
            respuesta = {error: false, codigo:200, mensaje: 'Libro eliminado correctamente', data: [result]}
    res.json(respuesta);
}
module.exports = {getBooks, getBooksId, postBooks, putBook, deleteBook}