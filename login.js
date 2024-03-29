const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const encoder= bodyParser.urlencoded();

const app = express();

const connection = mysql.createConnection({
    host : "localhost",
    port : "3306",
    user : "root",
    password : "Mani*2000",
    database : "task1"
});

connection.connect(function(error){
    if(error){
        console.log(error);
    }
    else{
        console.log('Database Connected');
    }
})

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/",encoder,function(req,res){
    var name= res.body.name;
    var email =  res.body.name;
    var password = res.body.name;
    var phone_number = res.body.name;
    var profile_image = res.body.name;
    connection.query("select *from signup where name =? and email=? and phone_number=? and profile_image=? and password =?",[name,email,password,phone_number,profile_image],function(error,results,fields){
        if(results.length > 0){
            res.redirect("/welcome");

        }else{
            res.redirect("/");
        }res.end();
    })

})

app.post("/signin",encoder,function(req,res){
    var password = res.body.name;
    var phone_number = res.body.name;
    connection.query("select *from signin where phone_number=? and password =?",[password,phone_number],function(error,results,fields){
        if(results.length > 0){
            res.redirect("/welcome");

        }else{
            res.redirect("/");
        }res.end();
    })

})


app.get("/welcome", function(req,res){
    res.sendFile(__dirname + "/welcome.html");
})


app.get('/', (req, res) => {
    const query = 'SELECT * FROM signup';
  
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Error fetching data');
        return;
      }
  
      let html = '<h1>Data from Database</h1><ul>';
      results.forEach(row => {
        html += `<li>${row.name} - ${row.email} - ${row.phone_number} - ${row.profile_image}</li>`;
      });
      html += '</ul>';
  
      res.send(html);
    });
  });
app.listen(4500);






