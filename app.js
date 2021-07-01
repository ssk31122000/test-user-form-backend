const express = require('express')
const app = express();
const db = require('./pgserver');

const dotenv=require('dotenv');
dotenv.config({path:'./.env'});
const send = require('./sendEmail');

const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.post("/",send.mail);
app.post("/add",db.addDB);
app.get('/all',db.db);

app.post("/validate",(req,res)=>{

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","*");
    res.header("Access-Control-Allow-headers","*");

    var phone=req.body.phone;
    var numbers = /^[0-9]+$/;
    if(phone.match(numbers) && phone.length === 10){
        return res.send({"isValid" : "true"});
    }else{
        return res.send({"isValid" : "false"});
    }
});
var port=process.env.PORT || 5000 
app.listen(port, ()=>{
    console.log(`Server is runing on port ${port}`)
});