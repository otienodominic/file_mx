const express = require('express');
const router = express.Router();
const {auth} = require('../middlewares')
const userController = require('../controllers/auth')
const fileController = require('../controllers/file')


//User controllers routes
router.post('/register', userController.Register)
router.post('/login', userController.Login)
router.delete('/delete-user', auth,userController.Delete)
router.post('/tokenIsValid', userController.TokenIsValid)
router.get('/', auth,userController.FindUser)




// File controller Routes
router.post('/create-file', auth,fileController.SaveFile)
router.get('/search-file', auth,fileController.SearchFile)
router.delete('/delete-file/:id', auth,fileController.DeleteFile)
router.put('/update-file/:id', auth, fileController.UpdateFile)


// get files with criteria
router.get('/get_all_files',auth,fileController.FindFiles)
router.get('/number_of_files',  fileController.CountFiles)

module.exports = router;

