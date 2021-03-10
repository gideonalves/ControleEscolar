const { date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    all(callback) {
        db.query(`
        SELECT * 
        FROM teachers
        ORDER BY name ASC`, function(err, results){            
            if(err) throw `Database Erro! ${err}`

            callback(results.rows)
        })
    },

    create(data, callback) {
        // aqui inseri os dados no campo de dados
        const query = `       
        INSERT INTO teachers (
            name,
            avatar_url,
            birth,
            education_level,
            class_type,
            subjects_taught,
            created_at           
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)   
            RETURNING id
        `
        const values = [
            data.name,
            data.avatar_url,
            data.birth,
            data.education_level,
            data.class_type,
            data.subjects_taught,
            data.create_at
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
        FROM teachers
        WHERE id = $1`, [id], function(err, results) {
            if(err) throw `Database Erro! ${err}`

            callback(results.rows[0])
        })
       
    },
    
}