const { date, grade } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    all(callback) {
        db.query(`
        SELECT * 
        FROM students
        ORDER BY name ASC`, function(err, results){            
            if(err) throw `Database Erro! ${err}`

            callback(results.rows)
        })
    },

    create(data, callback) {
        // aqui inseri os dados no campo de dados
        const query = `       
        INSERT INTO students (
            name,
            avatar_url,
            email,            
            birth,
            grade,
            time                    
            ) VALUES ($1, $2, $3, $4, $5, $6)   
            RETURNING id
        `
        const values = [
            data.name,
            data.avatar_url,
            data.email,
            // date(data.birth).iso,
            date(Date.now()).iso,
          data.grade = grade(data.grade),
            data.time
        ]

        db.query(query, values, function(err, results) {
            if(err) throw `Database Erro! ${err}`

            callback(results.rows[0])
        })
    },
    
    //achar
    find(id, callback) {
        db.query(`
        SELECT * 
        FROM students
        WHERE id = $1`, [id], function(err, results) {
            if(err) throw `Database Erro! ${err}`

            callback(results.rows[0])
        })       
    },

    update(data, callback){
        const query = `
        UPDATE students SET
            name=($1),
            avatar_url=($2),
            email=($3),           
            birth=($4), 
            grade=($5), 
            time=($6) 
        WHERE id = $7
        `
        const values = [
            data.name,
            data.avatar_url,
            data.email,
            date(data.birth).iso,
            data.grade,
            data.time,
            data.id
        ]

        db.query(query, values, function(err, results){
            if(err) throw `DATABASE error! ${err}`

            callback()
        })
    },

    delete(id, callback) {
        db.query(`DELETE FROM students WHERE id = $1`, [id], function(err, results) {
            if(err) throw `Database Erro! ${err}` // throw = lançar

            return callback()
        })
    }
    
}