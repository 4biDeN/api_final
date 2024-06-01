const userController = require('../controllers/user')

module.exports = (app) => {
    app.post('/user', userController.newUser)
    /**
        #swagger.tags = ["Departamento"] 
     
    */
    app.get('/user', userController.getUser)
    app.get('/user/:user_id', userController.getUserById)
    app.patch('/user/:user_id', userController.patchPassword)
}