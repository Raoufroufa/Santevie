const express = require("express");

const bodyParser = require("body-parser");

const mysql = require("mysql");

const ejs = require("ejs");

const app = express();

const path = require("path");

app.set('view engine', 'ejs');

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true}));

app.use(bodyParser.json());

app.use(express.static("public"));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'clinique'
});

connection.connect(error => {
    if(error) throw error;
    console.log('Connected to the database');
});


app.get("/", function(req, res){
    res.render('dash');
});

app.get("/appointments", function(req, res){

    const query = 'SELECT * FROM patients';

     connection.query(query, (error, results) => {
    if (error) throw error;
    res.render('appointments', { data: results });
  }); 
});


app.get("/patients", function(req, res){
    res.render('patients');
});

// get all appointments 
app.get("/appointments", function(req, res){
    connection.query('SELECT * FROM appointments', (error, rows, fields) =>{
        if(error) throw error;
        console.log(rows);
    })
});

// get all patients 
app.get("/patients", function(req, res){
    connection.query('SELECT * FROM patients', (error, rows, fields) =>{
        if(error) throw error;
        console.log(rows);
    })
});

// get all doctor 
app.get("/doctors", function(req, res){
    connection.query('SELECT * FROM doctor', (error, rows, fields) =>{
        if(error) throw error;
        console.log(rows);
        res.render("doctors", )
    })
});


app.delete('/patients/:id', (req, res) =>{
    connection.query('DELETE FROM patients where id =?', [req.params.id], (error, rows, fields) =>{
        if(error) throw error;
        console.log('deleted successfully.');
    })
})

app.post('/patients', (req, res) => {
  // Get the data from the form
  const data = req.body;

  // Insert the data into the database
  connection.query('INSERT INTO patients SET ?', data, (error, results) => {
    if (error) throw error;
    res.redirect('/patients');
  });
});

app.post('/doctors', (req, res) => {
  // Get the data from the form
  const data = req.body;

  // Insert the data into the database
  connection.query('INSERT INTO doctor SET ?', data, (error, results) => {
    if (error) throw error;
    res.redirect('/doctors');
  });
});


app.post('/appointments', (req, res) => {
  // Get the data from the form
  const data = req.body;

  // Insert the data into the database
  connection.query('INSERT INTO appointments SET ?', data, (error, results) => {
    if (error) throw error;
    res.redirect('/appointments');
  });
});



app.listen(5000, ()=>{
    console.log("Server sis running on port 5000")
});



