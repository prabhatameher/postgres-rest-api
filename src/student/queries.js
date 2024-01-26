const getStudents = "SELECT * FROM students_table";
const getStudentsById = "SELECT * FROM students_table WHERE id = $1";
const checkEmailExist = "SELECT * FROM students_table WHERE email = $1 ";
const addStudent = "INSERT INTO students_table (name,age,email,dob) VALUES  ($1, $2, $3, $4)";
const deleteStudent = "DELETE FROM students_table WHERE id = $1"
const updateStudent = "UPDATE students_table SET name = $1, age = $2, email =$3, dob=$4  WHERE id=$5 "
// const updateStudent = ""

module.exports = {
    getStudents,
    getStudentsById,
    checkEmailExist,
    addStudent,
    deleteStudent,
    updateStudent,
}