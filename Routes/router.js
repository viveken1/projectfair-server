const express = require('express')
const userController = require('../Controllers/userController')
const projectController = require('../Controllers/projectController')
const jwtMiddleware = require('./Middlewares/jwtMiddleware')
const multerConfig = require('./Middlewares/multerMiddleware')

const router = new express.Router()

//register

router.post('/register',userController.register)

//login
router.post('/login',userController.login)

//addproject
router.post('/add-project',jwtMiddleware,multerConfig.single('projectimage'),projectController.addProject)

//get allProjects

router.get('/all-Projects',jwtMiddleware,projectController.getAllProjects)

//get userprojects

router.get('/user-projects',jwtMiddleware,projectController.getUserProjects)

//get homeprojects

    router.get('/home-Projects',projectController.getHomeProjects)

    //edit project
    router.put('/edit-project/:pid',jwtMiddleware,multerConfig.single('projectimage'),projectController.editProject)

    //delete project
    router.delete('/remove-project/:pid',jwtMiddleware,projectController.removeProject)

    //edituser
        router.put('/edit-user',jwtMiddleware,multerConfig.single("profileimage"),userController.editUser)


// export router

module.exports = router