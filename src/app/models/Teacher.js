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
            birth,              // Data de nascimento 
            education_level,    //Grau de escolaridade
            class_type,         //Tipo de aula
            subjects_taught,    //Area de atuação
            created_at           
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)   
            RETURNING id
        `
        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,   //o birth tem que ser trabalhado
            data.education_level,   //Grau de escolaridade
            data.class_type,        //Tipo de aula
            data.subjects_taught,   //Area de atuação
            date(Date.now()).iso    // created_at
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

    delete(id, callback) {
        db.query(`DELETE FROM teachers WHERE id = $1`, [id], function(err, results) {
            if(err) throw `Database Erro! ${err}` // throw = lançar

            return callback()
        })
    }
    
}