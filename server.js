const express = require('express');
const app = express();
let data = [{name:"crud-app",studentname:"yash" ,likes:0},{name:"idkapp",studentname:"jaadu",likes:0}];

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/',(req,res)=>{
    res.render('main.ejs',{info:data});
})

app.post('/postdata',(req,res)=>{
    const cur = req.body;
    cur.likes =0;
    data.push(cur);
    res.redirect('/');
})
app.delete('/deleteproject',(req,res)=>{
    const name = req.body.name;
    data = data.filter((each)=>each.name!==name)
    console.log(data);
    res.send(data);
})
app.put('/likeproject',(req,res)=>{
    const name = req.body.name;
    data = data.map((each)=>{if(each.name==name){each.likes= each.likes + 1}return each});
    res.send(data);
})
app.listen(process.env.PORT || 6969,()=>{
    console.log("listening to port 6969");
})

