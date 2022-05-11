export default function validatePassword (value){
    const regexPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if(!regexPassword.exec(value)){
        return true
    }else{return false}
}