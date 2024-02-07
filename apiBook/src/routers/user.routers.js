const {Router} = require('express')
const router = Router();
const userCtrl = require ('../controller/user.controller');

router.get('/', userCtrl.getStart);
router.post('/register', userCtrl.postUsers);
router.post('/login', userCtrl.login)


module.exports = router;