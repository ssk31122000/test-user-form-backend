const { Client, defaults } = require('pg')
const dotenv=require('dotenv');
dotenv.config({path:'./.env'});


const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  })
  client.connect(function(err) {
    if (err){
      console.log(err);  
    }else{
      console.log("Connected!");
    } 
    
  });

exports.db=(req,res)=>{
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods","*");
        res.header("Access-Control-Allow-headers","*");
      client.query('SELECT * FROM form_data;', (err, response) => {
          if (err){
            consolr.log(err);
            res.send(err)
          }else{
            res.send(response.rows);
          }
          
        });
}

exports.addDB=(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","*");
    res.header("Access-Control-Allow-headers","*");
    const {name,dob,email,phone}=req.body;
    console.log(name)
    client.query(`INSERT INTO form_data(user_name, dob, email, phone)VALUES('${name}', '${dob}','${email}', '${phone}')`,(error,results)=>{
        if(error){
            console.log(error);
            res.send(error);
        }else{
            console.log(results)
            res.send("User added")
        }
    })
}

