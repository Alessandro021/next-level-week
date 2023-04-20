const express = require("express")
const server = express()

//pegar o banco de dados
const db = require("./database/db.js")

//configurar pasta publica

server.use(express.static("public"))

//habilitar o uso do req.body na nossa aplicação
//.use: serve para configurar o express

server.use(express.urlencoded({extended: true}))


//utilizando tampleite engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//configurar caminhos para a minha aplicação
//pagina inicil
//req: requisição
//res: Resposta
server.get("/", function(req,res) {
   return res.render("index.html", {title: "Um titulo"})
}) 


server.get("/criar-point", function(req,res) {
    //req.quiry e para get, e o req.body e para post
    //req.query: query strings da nossa url
    //console.log(req.query)

    return res.render("criar-point.html")
})

server.post("/savepoint", (req,res) => {
    //req.body: o corpo do nosso formulario
    // console.log(req.body)

    //inserir dados no banco de dados
    
        const query = `
            INSERT INTO places (
                image,
                name,
                address,
                address2,
                state,
                city,
                items
            ) VALUES (?,?,?,?,?,?,?);
        `
        const values = [
            req.body.image,
            req.body.name,
            req.body.address,
            req.body.address2,
            req.body.state,
            req.body.city,
            req.body.items

        ]
        function afterInsertData(err) {
            if(err) {
                 console.log(err)
                 return res.send("Erro no cadastro")
            }
            console.log("Cadastrado com sucesso")
            console.log(this)
            return res.render("criar-point.html", {saved: true})
        }
    
       db.run(query, values, afterInsertData)

    
})


server.get("/search", function(req,res) {

    const search = req.query.search

    if (search == "") {
        //pesquisa vazia
        return res.render("search-results.html", {total: 0})

    }

    //pegar os arquivos do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
                if(err) {
                    return console.log(err)
                }
                const total = rows.length
                console.log("Aqui estão seus registros: ")
                console.log(rows)

                //mostrar a pagina htlm com od dados do banco de dados
                return res.render("search-results.html", {places: rows, total: total})
    })

}) 

//ligar o servidor
server.listen(3001)