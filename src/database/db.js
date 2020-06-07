//importar a depedencia do sqlite3

const sqlite3 = require("sqlite3").verbose()

//criar o objeto que ira fazer operações no banco de dados

const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

//utilizar o objeto de bamco de dados, para nossas operações

//db.serialize(() => {
//     //com comandos sql eu vou:

//     //1 - criar uma tabela
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)

//     //2 - inserir dados na tabela
//     const query = `
//         INSERT INTO places (
//             image,
//             name,
//             address,
//             address2,
//             state,
//             city,
//             items
//         ) VALUES (?,?,?,?,?,?,?);
//     `
//     const values = [
//         "https://https://unsplash.com/photos/ET6_fDwZj2U.com/photos/qph7tJfcDys",
//         "Papersider",
//         "Guilherme Gemballa, Jardim America",
//         "Numero 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Residuos Eletrônicos, Lâmpadas"

//     ]
//     function afterInsertData(err) {
//         if(err) {
//             return console.log(err)
//         }
//         console.log("Cadastrado com sucesso")
//         console.log(this)
//     }

//    db.run(query, values, afterInsertData)

//     //3 - consultar dados da tabela
//     // db.all(`SELECT name FROM places`, function(err, rows) {
//     //     if(err) {
//     //         return console.log(err)
//     //     }

//     //     console.log("Aqui estão seus registros: ")
//     //     console.log(rows)
//     // })

    //4 - deletar um dados da tabela
    // db.run(`DELETE FROM places WHERE id = ?`, [4], function(err) {
    //     if(err) {
    //        return console.log(err)
    //     }
 
    //     console.log("Registro deletado com sucesso!")
    // })

//})