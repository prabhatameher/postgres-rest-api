const pool = require('../../db')
const queries = require('./queries')

const getStudents = (req, res) => {
    console.log('getting students');
    // pool.query("SELECT * FROM STUDENTS", (error, results) => {
    pool.query(queries.getStudents, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows)
    })
}

const getStudentsById = (req, res) => {

    console.log("Request Query Params", req.params.id)

    const id = parseInt(req.params.id);
    pool.query(queries.getStudentsById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows)
    })
}

const addStudent = (req, res) => {
    const { name, age, email, dob } = req.body;

    // check if email  exist
    pool.query(queries.checkEmailExist, [email], (error, result) => {
        if (error) throw error;
        if (result?.rows?.length) {
            res.send("Email already exist. ");
        } else {
            //add student to db
            pool.query(queries.addStudent, [name, age, email, dob], (error, result) => {
                if (error) throw error;
                res.status(201).send("Student Created Successfully !");
            })
        }
    });

}

const deleteStudent = (req, res) => {
    const id = parseInt(req.params.id);
    console.log("params id", id)

    pool.query(queries.getStudentsById, [id], (error, result) => {
        if (error) throw error;
        const noStudentFound = !result.rows.length
        if (noStudentFound) {
            res.send("Student ID Not Exist")
        } else {
            pool.query(queries.deleteStudent, [id], (error, result) => {
                if (error) throw error;
                res.status(200).send("Student Deleted Successfuly !")
            })
        }
    })
}

const updateStudent = (req, res) => {
    const id = parseInt(req.params.id)
    const { name, age, email, dob } = req.body;

    pool.query(queries.getStudentsById, [id], (error, result) => {
        if (error) throw error;
        console.log("Student Result :::", result.rows)
        const noStudentFound = !result.rows.length;
        if (noStudentFound) {
            res.send("Student ID doesn't match with any Student")
        } else {
            pool.query(queries.updateStudent, [name, age, email, dob, id], (error, result) => {
                if (error) throw error;
                res.status(200).send("Student Update Successfully")
            })
        }
    })
}


module.exports = {
    getStudents,
    getStudentsById,
    addStudent,
    deleteStudent,
    updateStudent

}