const { age, graduation, date } = require('../../lib/utils')
const Intl = require('intl')
const Teacher = require('../models/Teacher')

module.exports = {

    index (req, res) { 
        const { filter } = req.query 

        if ( filter ) {
            Teacher.findBy(filter, function( teacher ){
                return res.render("teachers/index", { teacher })
            })
        } else {
            Teacher.all(function(teacher) {
                return res.render("teachers/index", { teacher })
            })
        }
        
      
    },

    show (req, res) {    
        Teacher.find(req.params.id, function(teacher) {
            if (!teacher) return res.send("Teacher not found!")

            teacher.age = age(teacher.birth)
            teacher.subjects_taught = teacher.subjects_taught.split(",")
            teacher.education_level = graduation(teacher.education_level)
            teacher.created_at = date(teacher.created_at).format

            return res.render("teachers/show", { teacher })
        })
    },

    create (req, res) {  
        return res.render("teachers/create")
    },
     
    post (req, res) { // POST = A CREAT CRIAR
    
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields!')
            }
        }     
        Teacher.create(req.body, function(teacher) {
            return res.redirect(`/teachers/${teacher.id}`)
        })
    
    },
        
    edit (req, res) {   
            Teacher.find(req.params.id, function(teacher) {
                if (!teacher) return res.send("Teacher not found!")

                teacher.birth = date(teacher.birth).iso
                teacher.subjects_taught = teacher.subjects_taught.split(",")
                teacher.created_at = date(teacher.created_at).format

                return res.render("teachers/edit", { teacher })
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
        Teacher.update(req.body, function() {
            return res.redirect(`/teachers/${req.body.id}`)
        })
    },
    
    delete (req, res ) {
        Teacher.delete(req.body.id, function() {
            return res.redirect(`/teachers`)
        })
    }
    
}



















