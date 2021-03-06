const { date, graduation } = require('../../lib/utils')
const db = require('../../config/db')


module.exports = {
    all(callback) {
        db.query(`
        SELECT teachers.*, count(students) AS total_students
        FROM teachers
        LEFT JOIN students ON (teachers.id = students.teacher_id)
        GROUP BY teachers.id
        ORDER BY total_students DESC`, function(err, results){            
            if(err) throw `Database Erro! ${err}`

            callback(results.rows)
        })
    },

    create(data, callback) {
        // aqui inseri os dados no campo de dados
        const query = `       
        INSERT INTO teachers (
            avatar_url,
            name,
            birth,               
            education_level,    
            class_type,         
            subjects_taught,    
            created_at           
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)   
            RETURNING id
        `
        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,   
            data.education_level,   
            data.class_type,        
            data.subjects_taught,   
            date(Date.now()).iso    
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
    
    update(data, callback){
        const query = `
        UPDATE teachers SET
            avatar_url=($1),
            name=($2),
            birth=($3),
            education_level=($4),
            class_type=($5),
            subjects_taught=($6)
        WHERE id = $7
        `

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.education_level,
            data.class_type,
            data.subjects_taught,
            data.id
        ]
        
        db.query(query, values, function(err, results){
            if(err) throw `DATABASE error! ${err}`
            
            callback()
        })
    },
    // Filtro
    findBy(filter, callback) {
        db.query(`
        SELECT teachers.*, count(students) AS total_students
        FROM teachers
        LEFT JOIN students ON (teachers.id = students.teacher_id)
        WHERE teachers.name ILIKE '%${filter}%'
        GROUP BY teachers.id
        ORDER BY total_students DESC`, function(err, results){            
            if(err) throw `Database Erro! ${err}`

            callback(results.rows)
        })
    },

    delete(id, callback) {
        db.query(`DELETE FROM teachers WHERE id = $1`, [id], function(err, results) {
            if(err) throw `Database Erro! ${err}` // throw = lan??ar

            return callback()
        })
    },
    paginate(params) {
        const { filter, limit, offset, callback } = params

        let query = "",
            filterQuery = "",
            totalQuery = `(
                SELECT count(*) FROM teachers
            ) AS total`            

        if ( filter ) {

            filterQuery = `
            WHERE teachers.name ILIKE '%${filter}%'
            `

            totalQuery = `(
                SELECT count(*) FROM teachers
                ${filterQuery}
            ) as total`
        }

        query = `
        SELECT teachers.*, ${totalQuery}, count(students) AS total_students 
        FROM teachers
        LEFT JOIN students ON (teachers.id = students.teacher_id)
        ${filterQuery}
        GROUP BY teachers.id LIMIT $1 OFFSET $2
        `
        db.query(query, [limit, offset], function(err, results) {
            if(err) throw `Database Erro! ${err}` // throw = lan??ar

             callback(results.rows)
        })
    }
    
}