const { Router } = require('express');
const controller = require('./controller')

const router = Router();

// router.get('/', (req, res) => {
//     res.send("using api route")
// })
router.get('/', controller.getStudents)
router.get('/get-student/:id', controller.getStudentsById)
router.post('/add-student', controller.addStudent)
router.put('/update-student/:id', controller.updateStudent)
router.delete('/delete-student/:id', controller.deleteStudent)

module.exports = router;