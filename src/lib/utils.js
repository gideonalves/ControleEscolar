module.exports = {
    age(timestamp) {

        const today = new Date() // data de hoje
        const birthData = new Date(timestamp) // nascimento
    
        // 2021 - 1981 = 40 ano
        let age = today.getFullYear() - birthData.getFullYear()      
        const month = today.getMonth() - birthData.getMonth()
    
        if (month < 0 || month == 0 && today.getDate() <= birthData.getDate()) {

            age = age -1
        }
        return age
    },

    graduation(graduation) {
        switch (graduation) {
            case ("EM"): return "Ensino médio Completo";
            case ("ES"): return "Ensino Superior Completo";
            case ("M"): return "Mestrado";
            case ("D"): return "Doutorado"
        }
    },

    date(timestamp) {
        const date = new Date(timestamp)
        //yyyy
        const year = date.getUTCFullYear()
        //mm
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        //dd
        const day = `0${date.getUTCDate()}`.slice(-2) //slice pega menos 2 zeros
        //return yyyy-mm-dd
        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`,
            format: `${day}/${month}-${year}`
        }
    },
    
    grade(grade) {
        switch (grade) {
            case ("5EF"): return "5º ano do ensino fundamental";
            case ("6EF"): return "6º ano do ensino fundamental";
            case ("7EF"): return "7º ano do ensino fundamental";
            case ("8EF"): return "8º ano do ensino fundamental";
            case ("9EF"): return "9º ano do ensino fundamental";
            case ("1EM"): return "1º ano do ensino médio";
            case ("2EM"): return "2º ano do ensino médio";
            case ("3EM"): return "3º ano do ensino médio";
        }
    }

}

