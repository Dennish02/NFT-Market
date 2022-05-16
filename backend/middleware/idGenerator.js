
export default function makeGeneratorIDRandom(length){
    let result= '#';
    const caracteres= 'ABCDEFGHIJKLMN3456OPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz012789';
    for (let i = 0; i < length; i++ ) {
        result += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
     }
    result.toUpperCase()
     return result;
  }

