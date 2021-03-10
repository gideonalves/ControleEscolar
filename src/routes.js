const express = require('express')
const routes = express.Router() // 01 routes sera responsavel por todas as rotas
const teacher = require('./app/controllers/teacher')
const students = require('./app/controllers/students')


// Rotas
routes.get('/', function(req, res) {  // 02
    // nessa rota oque muda é o "redirect"
    return res.redirect("teachers") 
})

// rota da index
routes.get('/teachers', teacher.index ) // mandando a função para a pagina "theacher.js" (01)

// rota pagina create
routes.get('/teachers/create', teacher.create)

// rota mostra
routes.get('/teachers/:id', teacher.show) 

// rota edit
routes.get('/teachers/:id/edit', teacher.edit)

// rota pagina formulario POST
routes.post("/teachers", teacher.post)

// rota pagina formulario PUT
routes.put("/teachers", teacher.put)

// rota pagina formulario deletar
routes.delete("/teachers", teacher.delete)


// roda pagina students

// rota da index
routes.get('/students', students.index ) // mandando a função para a pagina "theacher.js" (01)

// rota pagina create
routes.get('/students/create', students.create)

// rota mostra
routes.get('/students/:id', students.show) 

// rota edit
routes.get('/students/:id/edit', students.edit)

// rota pagina formulario POST
routes.post("/students", students.post)

// rota pagina formulario PUT
routes.put("/students", students.put)

// rota pagina formulario deletar
routes.delete("/students", students.delete)

// aqui o module exporta as routes
module.exports = routes