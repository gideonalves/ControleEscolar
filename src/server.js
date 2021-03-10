/* ================ Esse bloco chama as outros aquivos ===================== */
                                                                            //
const express = require('express')                                          //
const nunjucks = require('nunjucks') //chama o nunjucks                     //
const routes = require('./routes') // 03 chama o nunjucks                   //
const methodOverride = require('method-override')                           //
                                                                            //
const server = express()                                                    //
                                                                             //
/* ========================================================================== */

/* todos os arquvos use ou os miduer */

server.use(express.urlencoded({extended: true})) /* essa linha é responsavel pra ativar o req.body */
server.use(express.static('public')) /* public ativa tudo que fica dentro da pasta public */
server.use(methodOverride('_method'))// serve para o put e o delet
server.use(routes) // 04 responsavel por chamar a pagina routers.js


/*================================================*/


server.set("view engine", "njk")

nunjucks.configure("src/app/views", {
    express: server,
    autoescape: false,
    noCache: true
})

// aqui configura a porta http://localhost:5000/
server.listen(5000, function() {
    console.log("server is running")
})