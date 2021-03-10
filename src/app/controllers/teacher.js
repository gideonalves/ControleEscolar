const { age, grade, date } = require('../../lib/utils')
const Intl = require('intl')
const Teacher = require('../models/Teacher')

module.exports = {

    index (req, res) {  
       Teacher.all(function(teacher) {
           return res.render("teachers/index", { teacher })
       })
    },

    create (req, res) {  
        return res.render("teachers/create")
    },
     
    post (req, res) {
    
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
    
    show (req, res) {    
        Teacher.find(req.params.id, function(teacher) {
            if (!teacher) return res.send("Teacher not found!")

            teacher.age = age(teacher.birth)
            teacher.subjects_taught = teacher.subjects_taught.split(",")

            return res.render("teachers/show", { teacher })
        })
    },
    
    edit (req, res) {   
        // req.params
        
        return 
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
        return
    },
    
    delete (req, res ) {
      
            return 
    }
    
}



















