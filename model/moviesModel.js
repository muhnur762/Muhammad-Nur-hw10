const pool = require("../config/koneksi");

class Movies{

    constructor(id, title, genres, year, photo){
        this.id = +id;
        this.title = title;
        this.genres = genres;
        this.year = year;
        this.photo = photo;
    }

    static showAll(callback){
        let query = `SELECT * FROM movies;`;

        pool.query(query, (err, data) => {
            if(err){
                callback(err, null);
            }
            else{
                data = data.rows.map(movies => new Movies(movies.id, movies.title, movies.genres, movies.year, movies.photo));
                // console.log(data);
                console.log("SHOW DATA");
                callback(null, data)
            }
        });
        
    }

    static data(callback){
        let query = `SELECT * FROM movies;`;
        pool.query(query, (err, data) => {
            if(err){
                callback(err, null);
            }
            else{
                callback(null, data.rows)
            }
        });
    }

    static addMovie(objek, callback){
        let query = `
                INSERT INTO movies ("title", "genres", "year", "photo") VALUES ($1, $2, $3, $4);
            `;

            let arrData = [objek.title, objek.genres, objek.year, objek.photo];

            pool.query(query, arrData, (err, result) => {
                if(err){
                    callback(err, null);
                }
                else{
                    console.log(`${objek.title} sudah masuk datanya..`);
                    callback(null, null);
                }
            });
    }


    static showFormEdit(id, callback){
        let query = `SELECT * FROM movies WHERE id = ${+id};`;

        pool.query(query, (err, data) => {
            if(err){
                callback(err, null);
            }
            else{
                // * instantiate
                console.log(data.rows[0]);
                console.log("SHOW DATA");
                callback(null, data.rows[0]);
            }
        });

    }

    static editMovies(id, objek, callback){
        let query = `
            UPDATE movies SET "title" = $1, "genres" = $2, "year" = $3, "photo" = $4 WHERE "id" = ${+id};
            `;

            let arrData = [objek.title, objek.genres, objek.year, objek.photo];

            pool.query(query, arrData, (err, result) => {
                if(err){
                    callback(err, null);
                }
                else{
                    console.log(`${objek.tiitle} sudah di update datanya..`);
                    callback(null, null);
                }
            });
    }


    static deleteMovie(id, callback){
        let query = `DELETE FROM movies WHERE id = ${id};`;

        pool.query(query, (err, result) => {
            if(err){
                callback(err, null);
            }
            else{
                console.log(`${id} sudah DIHAPUS datanya..`);
                callback(null, null);
            }
        });
    }
}

module.exports = Movies;