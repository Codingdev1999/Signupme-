const express = require('express');
const bodyParser = require('body-parser');
// const request  = require("request");
const https = require('https');
const { STATUS_CODES } = require('http');
const app = express();
// const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post("/",function(req,res){
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const em = req.body.email;
    const data = {
        members : [
            {
                email_address: em,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const JsonData = JSON.stringify(data)

     const url = "https://us11.api.mailchimp.com/3.0/lists/4123a00e6d"

     const options ={
        method : "POST",
        auth: "debashis1:432bcccdd180a66039c99072f4f8cd7a7-us11"
     }

     const request = https.request(url,options,function(response){
        response.on("data",function(data){
            console.log(JSON.parse(data))
            const status = response.statusCode
            if(status === 200){
                    res.sendFile(__dirname +"/sucess.html");
            }
            else{
                res.sendFile(__dirname + "/failure.html");
            }
        })
     })
     request.write(JsonData);
     request.end();
});

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/failure",function(req,res){
    res.redirect('/');
})




app.listen(process.env.PORT || 3000,function(){
    console.log("server running in port 3000")
})

//Api key
// 432bccdd180a66039c99072f4f8cd7a7-us11

//list id
// 4123a00e6d