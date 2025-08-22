const express=require('express')
const router=new express.Router()

const todoController=require('../controller/todocontroller')
const authMiddleware = require('../middleware/authmiddleware');

router.post('/',authMiddleware,todoController.createTodo)
router.get('/',authMiddleware,todoController.getTodos)
router.put('/:id',authMiddleware,todoController.updateTodo)
router.delete('/:id',authMiddleware,todoController.deleteTodo)

module.exports=router