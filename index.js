const express = require('express');
const Port = 3000;
const app = express();
const bodyParser = require('body-parser');
const path = require("path");
const axios = require('axios');
const ejs = require('ejs');
let input;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));
// const Url = `https://openlibrary.org/search/authors.json?q=${string}`





app.get('/', (req, res)=> {
    // res.json({name: "man"})
    const Url = `https://openlibrary.org/search/authors.json?q=${input}`
    axios(Url)
    .then((response)=> {
        const data = response.data
        // console.log(data)
        const {name,top_subjects ,top_work,work_count}=data.docs[0];
        // console.log(name,top_subjects ,top_work,work_count);
     res.render("index",{name:name,top_subjects:top_subjects,top_work:top_work, work_count:work_count})
    })
    
   
})
app.post('/', (req,res)=> {
     input = req.body.input1
     input.replace(" ","%20");
    // console.log(input);
    res.redirect('/')
})


app.listen(Port, ()=> {
    console.log(`Server running on Port ${Port} ...`)
})