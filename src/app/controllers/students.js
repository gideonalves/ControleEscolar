const { age, grade, date } = require('../../lib/utils')
const Intl = require('intl')
const Student = require('../models/Student')

module.exports = {

    index (req, res) {  
       Student.all(function(student) {
           return res.render("students/index", { student })
       })
    },

    create (req, res) { 
        
        Student.teachersSelectOptions(function(options) {

            return res.render("students/create", { teacherOptions: options })
        })

    },
     
    post (req, res) {
    
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields!')
            }
        }     
        Student.create(req.body, function(student) {
            return res.redirect(`/students/${student.id}`)
        })
    
    },
    
    show (req, res) {    
        Student.find(req.params.id, function(student) {
            if (!student) return res.send("Student not found!")

            student.birth = date(student.birth).birthDay

            // student.created_at = date(student.created_at).format

            student.grade = grade(student.grade)

            console.log(student)


            return res.render("students/show", { student })
        })
    },
    
    edit (req, res) {   
            Student.find(req.params.id, function(student) {
                if (!student) return res.send("Student not found!")

                student.birth = date(student.birth).iso
                student.created_at = date(student.created_at).format
                
                Student.teachersSelectOptions(function(options) {
                    return res.render("students/edit", { student, teacherOptions: options })
                })
                console.log(student)
        })
    },

    put (req, res) {
        const keys = Object.keys(req.body) /* Object.keys ele cria um arrey de objeto pega todos os campo do formulario */
        /*+++++++++ esse comando ver se todos os campo esta prenxido se não estiver ele aparece uma mensagem "Please, fill all fields!" */
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields!')
            }
            /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */    
        }
        Student.update(req.body, function() {
            return res.redirect(`/students/${req.body.id}`)
        })
    },
    
    delete (req, res ) {
        Student.delete(req.body.id, function() {
            return res.redirect(`/students`)
        })
    }
    
}



















