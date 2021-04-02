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
            time,
            teacher_id                    
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)   
            RETURNING id
        `
        const values = [
            data.name,
            data.avatar_url,
            data.email,
            // date(data.birth).iso,
            date(Date.now()).iso,
            data.grade = grade(data.grade),
            data.time,
            data.teacher
        ]

        db.query(query, values, function(err, results) {
            if(err) throw `Database Erro! ${err}`

            callback(results.rows[0])
        })
    },
    
    //achar
    find(id, callback) {
        db.query(`
        SELECT students.*, teachers.name AS teacher_name 
        FROM students
        LEFT JOIN teachers ON (students.teacher_id  = teachers.id)
        WHERE students.id = $1`, [id], function(err, results) {
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
            time=($6),
            teacher_id=($7)                    

        WHERE id = $8
        `
        const values = [
            data.name,
            data.avatar_url,
            data.email,
            date(data.birth).iso,
            data.grade,
            data.time,
            data.teacher,
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
    },

    teachersSelectOptions(callback) {
        db.query(`SELECT name, id FROM teachers`, function(err, results) {
            if(err) throw `Database Erro! ${err}`

            callback(results.rows)
        })   
    },
    paginate(params) {
        const { filter, limit, offset, callback } = params

        let query = "",
            filterQuery = "",
            totalQuery = `(
                SELECT count(*) FROM students
            ) AS total`            

        if ( filter ) {

            filterQuery = `
            WHERE students.name ILIKE '%${filter}%'
            OR students.email ILIKE '%${filter}%'
            `

            totalQuery = `(
                SELECT count(*) FROM students
                ${filterQuery}
            ) as total`
        }

        query = `
        SELECT students.*, ${totalQuery}
        FROM students
        ${filterQuery}
        LIMIT $1 OFFSET $2
        `
        db.query(query, [limit, offset], function(err, results) {
            if(err) throw `Database Erro! ${err}` // throw = lançar

             callback(results.rows)
        })
    }
}