const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public")); //folder for images, css, js

const request = require('request');

const kwords = ["otters","oceans","boats","trains","cars","fruit","cereal"];


//routes
app.get("/", async function(req, res){
 let randomPic = Math.floor(Math.random() * 7);
 let word = kwords[randomPic];
 let parsedData = await getImages(word,"all");
 
 console.dir("parsedData: " + parsedData); //displays content of the object
    
 res.render("index", {"images":parsedData},);
            
}); //root route


app.get("/results", async function(req, res){
    
    //console.dir(req);
    let keyword = req.query.keyword; //gets the value that the user typed in the form using the GET method
    let way = req.query.or;
    //console.log(orientate);
    let parsedData = await getImages(keyword,way.toLowerCase());

    res.render("results", {"images":parsedData});
    
});//results route


//Returns all data from the Pixabay API as JSON format
function getImages(keyword, way){
    
    
    return new Promise( function(resolve, reject){
        request('https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&q='+keyword + '&orientation=' + way,
                 function (error, response, body) {
    
            if (!error && response.statusCode == 200  ) { //no issues in the request
                
                 let parsedData = JSON.parse(body); //converts string to JSON
                 
                 resolve(parsedData);
                //let randomIndex = Math.floor(Math.random() * parsedData.hits.length);
                //res.send(`<img src='${parsedData.hits[randomIndex].largeImageURL}'>`);
                //res.render("index", {"image":parsedData.hits[randomIndex].largeImageURL});
                
            } else {
                reject(error);
                console.log(response.statusCode);
                console.log(error);
            }
    
          });//request
   
    });
    
}

// app.listen("8081", "127.0.0.1", function() {
//     console.log("Express server is running...");
// });

//starting server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Express server is running...");
});