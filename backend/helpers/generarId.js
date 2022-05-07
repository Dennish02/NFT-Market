const generarID = ()=>{
   const random = Math.random().toString(32).substring(2)//cadena random de letras- dos primeros lugarres
   const date = Date.now().toString(32);
   return random + date;
}

export {
    generarID
}