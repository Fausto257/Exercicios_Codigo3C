const prompt = require('prompt-sync')();
//let senhagravada = prompt('Senha Nova!!!');
let senhagravada = "123";
let conta = 0;

do {
    let senhadigitada = prompt('Digite sua senha: ');
    if (senhadigitada === senhagravada)
    {
        console.log("Senha correta!");
        break;
    }
    else{

        conta++;
    }
} while (conta < 4);

if (conta > 2)
{
    console.log("Número de tentativas excedido!");
}









//let contador = prompt('Digite qtd vezes: ');

/*
for (i=0; i < contador; i++)
{
console.log(i);
}
*/
/*
let conta = 0;
while (conta < contador)
    {
    console.log(conta);
    conta++;
}
*/

/*
let conta=0;
while (true)
{
    console.log(conta);
    conta++;
    if (conta < contador)
    {
        continue;
    }
    else {
    break;
    }
}
    
   let conta;
   conta = 0;

   do {
    console.log("Contador = " + conta );
    conta++;
} while (conta < contador);
*/

//let senhagravada = "123";