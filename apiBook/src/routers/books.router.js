const {Router} = require('express')
const router = Router();
const booksCtrl = require ('../controller/books.controller');


router.get('/books/:id_user', booksCtrl.getBooks);
router.get('/books/:id_user/:id_book', booksCtrl.getBooksId);
router.post('/books', booksCtrl.postBooks);
// router.put('/books', booksCtrl.putBook);
// router.delete('/books', booksCtrl.deleteBook);

module.exports = router;