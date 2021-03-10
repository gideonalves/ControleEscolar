const { grade, date } = require('../../lib/utils')
const Intl = require('intl')

module.exports = {

    index (req, res) { 
 
        return res.render("students/index") 
    },

    create (req, res) {  
        return res.render("students/create")
    },
     
    post (req, res) {
    
        const keys = Object.keys(req.body) 
            for (key of keys) {
                if (req.body[key] == "") {
                    return res.send('Please, fill all fields!')
                }
    
        }     
        Students.create(req.body, function(students) {
            return res.redirect(`/students/${students.id}`)
        })
    
    },
    
    show (req, res) {    
        
        return  
    },
    
    edit (req, res) {   
        // req.params
        
        return 
    },

    put (req, res) {
        const keys = Object.keys(req.body) 
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields!')
            }
    
        }
        return
    },
    
    delete (req, res ) {
      
            return 
    }
    
}



















