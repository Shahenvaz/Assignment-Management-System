const express = require('express')
const app = express()
app.set('view engine', 'pug')

app.set('views', __dirname + '/src/views')

let data =[
            {
                assignmentnumber:'shahenvaz',
                name:'khan'
            },
            {
                name:'khan'
            }
    ]

app.get('/', (req,res) => {
res.render('index',{data:data})
})
app.listen(3000, () => {console.log("Listening on port 3000")})