const Movies = require("../model/moviesModel");
const fs = require("fs");

class Controller{
    // menmapilakn seluruh data 
    static showAll(req,res){
        Movies.showAll((err,data) => {
            if(err) {
                res.send(err);
            }else{
                res.render("showAll", {data});
            }
        })
    }

    // menampilkan form 
    static showFormAdd(req,res){
        res.render("addform");
    }


    static async addMovie(req,res){
    
       

        fs.readFile("file.txt","utf-8",(err, fileName)=>{
            const { title, genres, year } = req.body; 
            const objek = {
                title, 
                genres, 
                year, 
                photo : fileName} 
            console.log(title);
            Movies.addMovie(objek, (err, data) => {
                if(err){
                    res.send(err);
                }else{
                    res.redirect("/movies")
                }
            });
        })
        
    }

    static showFormEdit(req,res){
        const id = req.params.id;
        Movies.showFormEdit(id, (err, data) => {
            if(err){ 
                res.send(err);
            }
            else{
                res.render("editForm", {data});
            }
        });
    }

    static editMovie(req,res){
        fs.readFile("file.txt","utf-8",(err, fileName)=>{
        const { title, genres, year } = req.body; 
        const objek = {
            title, genres, year, photo : fileName
        }
        Movies.editMovies(req.params.id, objek, (err, data) => {
            if(err){
                res.send(err);
            }
            else{
                res.redirect("/movies");
            }
        });
        })
    }

    static deleteMovie(req,res){
        const id = req.params.id;
        Movies.deleteMovie(id, (err, data) => {
            if(err){
                res.send(err);
            }
            else{
                res.redirect("/movies")
            }
        });
    }
}

module.exports = Controller;