let first = document.querySelector('.first')
let second = document.querySelector('.second')
let third = document.querySelector('.third')
let button = document.querySelector('.button')
let submit_btn = document.querySelector('.submit-btn')

let a1 = document.querySelector('#a1') 
let a2 = document.querySelector('#a2') 
let a3 = document.querySelector('#a3') 

let warning = document.querySelector('.warning')


second.classList.add('hide')
third.classList.add('hide')
submit_btn.classList.add('hide')

let count = 0;
button.addEventListener('click',(event)=>{
    count++;
    if(count==1)
    {
        first.classList.add('hide')
        second.classList.remove('hide')
    }
    if(count==2)
    {
        second.classList.add('hide')
        button.classList.add('hide')
        third.classList.remove('hide')
        submit_btn.classList.remove('hide')
    }

})
a1.addEventListener('click',(event)=>{
    first.classList.remove('hide')
    second.classList.add('hide') 
    third.classList.add('hide')
    button.classList.remove('hide')
    submit_btn.classList.add('hide')
    count=0;
})

a2.addEventListener('click',(event)=>{
    first.classList.add('hide')
    second.classList.remove('hide') 
    third.classList.add('hide')
    button.classList.remove('hide')
    submit_btn.classList.add('hide')
    count=0;
})
a3.addEventListener('click',(event)=>{
    first.classList.add('hide')
    second.classList.add('hide') 
    third.classList.remove('hide')
    button.classList.add('hide')
    submit_btn.classList.remove('hide')
    count=0;
})

function validation(a)
{
    let name = document.getElementById('name').value
    let password = document.getElementById('password').value
    let secret_key=document.getElementById('secretKey').value
    if(name=="")
    {
        warning.classList.remove('hide')
        warning.innerHTML='teacher name cannot be empty'
        timeout()
        return false;
    }
    if (password=="")
    {
        warning.innerHTML='password cannot be empty'
        warning.classList.remove('hide')
        timeout()   
        return false
    }
    if(secret_key=="")
    {
        warning.innerHTML='Please enter Secret key'
        warning.classList.remove('hide')
        timeout()   
        return false
    }
    
}

function timeout()
{
    setTimeout(()=>{
        console.log('i am called')
        warning.classList.add('hide')
    },3000)
}