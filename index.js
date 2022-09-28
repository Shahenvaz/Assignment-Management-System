const express = require('express')
const path = require('path')
const bodyparser = require('body-parser')
const app = express()
const {Teacher} = require('./connection')
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const { Db } = require('mongodb')

const port = 8000

const dbObject = new Teacher

//cookie testing start here

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

app.set('view engine', 'pug')
app.set('views', __dirname+'/src/views')

app.use(cookieParser())

var session;

//cookie testing end here

app.use(bodyparser.urlencoded({  extended : false    }));


app.use(express.static(path.join(__dirname, 'public')));


//entry route
app.get('/',async(req,res)=>{
    if(req.session.userId)
    {
        let a = await dbObject.findAssignment({tname:req.session.userId})
        let response = [{
            userId: req.session.userId
        },
        {
            assignments : a
        }
    ]
        res.render('assignmentPage',{response:response})
    }

    else if(req.session.StudentId)
    {
        
        StudentClass = req.session.StudentClass
        let a = await dbObject.findStudentAssignment({class:StudentClass})
         let response = [{
            StudentId: req.session.StudentId
        },
         {
             assignments : a
         }]
        res.render('studentIndex',{response: response})
    }
    else
    {
        res.sendFile(__dirname+'/public/index1.html')
    }
})

//student Controller

app.get('/studentSignin',(req,res)=>{
    //res.sendFile(__dirname+'/public/Student/logInForm.html')
    swarning = req.session.swarning
    req.session.swarning = false
    res.render('loginFOrm',{swarning:swarning}) 
})











// teacher controller

    app.get('/teacherSignin',(req,res)=>{
        warning = req.session.warning
        req.session.warning=false
        res.render('teacherSignIn',{warning:warning})
        
    })

    app.get('/teacherSignUp',(req,res)=>{
        
        res.sendFile(__dirname+'/public/Teacher/teacherSignUp.html')
    })

    app.get('/addNewAssinment', (req,res) => {
    res.render('addNewAssignment',{username:req.session.userId})
    })

    app.post('/tsignUp',(req,res)=>{
        dbObject.signUp(req.body)
        res.redirect('/teacherSignin')
    })

// teacherCOntroller end    



app.post('/addAssignment',(req,res)=>{
    Id ={ assignmentId : randomIdgenerator()}

    data = Object.assign(req.body,Id)
    
    dbObject.insertAssignment(data)

    res.redirect('/')
})
app.get('/deleteAssignment',(req,res)=>{
    console.log(req.query.id)
    dbObject.deleteAssignment({assignmentId:req.query.id})
    res.redirect('/')
})


//authentications
//-------------------------teacher--------------------------------------------------------------------------//
app.post('/tlogin',async(req,res)=>{
    let teacherName = '"'+req.body.tname+'"'
    let teacherPassword = '"'+req.body.tpassword.toString()+'"'

    let query = `[{"tname":${teacherName}},{"tpassword":${teacherPassword}}]`.toString()
    let a =await dbObject.signInCheck(query)
   
    if(a==1)
    {
       session = req.session
       session.userId = req.body.tname
       res.redirect('/')
    }
   
    else
    {
        session = req.session
        session.warning=true
        res.redirect('/teacherSignin')
    }
})

//-------------------------Student--------------------------------------------------------------------------//

app.post('/slogin',async(req,res)=>{
    let EMAIL = '"'+req.body.name+'"'
    let PASSWORD = '"'+req.body.password.toString()+'"'

    let query = `[{"EMAIL":${EMAIL}},{"PASSWORD":${PASSWORD}}]`.toString()
    let a =await dbObject.StudentsignInCheck(query)
   
    if(!a.length)
    {
        session = req.session
        session.swarning=true
        res.redirect('/studentSignin')
    }
   
    else
    {
        session = req.session
        session.StudentId = a[0].NAME
        session.StudentClass = a[0].CLASS
        res.redirect('/')
    }
})





app.get('/logout',(req,res)=>{
    session = req.session
    session.destroy()
    res.redirect('/')






})
//authentication end
app.listen(port,()=>{
    console.log(`server is running at ${port} okk`)
})

//id generator
function randomIdgenerator()
{
    let randomId= Math.ceil(Math.random()*10000);
    const charecter="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let password="";
    for(i=0;i<8;i++)
    {
        
    password +=charecter.charAt(Math.ceil(Math.random()*charecter.length));
    }
    password+=randomId;
    return password
}