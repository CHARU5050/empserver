const express=require('express');
const app=express();
const mysql=require('mysql');
const cors=require('cors');

app.use(cors());
app.use(express.json());

const db=mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'Charu@123',
    database:'employee',
})

app.post('/create',(req,res)=>{
    const name=req.body.name
    const empid=req.body.empid
    const date=req.body.date
    const dept=req.body.dept;
    const dateofhire=req.body.dateofhire
    const email=req.body.email
    const gender=req.body.gender
    const location=req.body.location
    const designation=req.body.designation
    const salary=req.body.salary

    db.query('INSERT INTO emp (name,empid,date,dept,email,gender,design,salary,hire,location) VALUES(?,?,?,?,?,?,?,?,?,?)',
    [name,empid,date,dept,email,gender,dept,salary,dateofhire,location],(err,result)=>{
        if(err){
            console.log(err);
            res.status(500).json({error:"You can't able to enter a empty value"})
        }
        else{
            res.send("values are inserted");
        }
    });
});

app.get('/employee',(req,res)=>{
    db.query('SELECT * FROM emp',(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);

        }

    })

})
app.get('/analysis', (req, res) => {
    db.query('SELECT YEAR(STR_TO_DATE(hire, "%Y-%m-%d")) AS YearOfJoining, COUNT(*) AS TotalEmployeesJoined FROM emp GROUP BY YEAR(STR_TO_DATE(hire, "%Y-%m-%d")) ORDER BY YearOfJoining',
    (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.send(result);
    });
});




app.listen(3001,()=>{
    console.log("hey,running");
})