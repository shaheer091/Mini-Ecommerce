const inputPassword = document.getElementById('inputUsername')
const inputEmail = document.getElementById('inputEmail')
const inputPassword = document.getElementById('inputPassword')
const errorMessage=document.getElementById('errorMessage')
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const validateSignup = function () {
    const validPassword = passwordPattern.test(inputPassword)
    if(!validPassword){
        errorMessage.innerHTML='enter valid password'
    }else{
        errorMessage.innerHTML=''
    }
}