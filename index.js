// buttons
const SIGN_IN = document.getElementById('signin');
const LOG_IN = document.getElementById('login');
const TRANSFER = document.getElementById('transfer');

// tags for print the information
const BALANACE = document.getElementById('balance');
const TRANSACTIONS = document.getElementById('transactions');
const USER_NAME = document.getElementById('user-name');

// Money formater
const OPTION = {style : 'currency', currency: 'COP'}; 
const MONEY_FORMAT = new Intl.NumberFormat('es-CO', OPTION); 

// Variables
let userToTransfer = '';
let users = ['HabiMan', 'JulSarmiento', 'MariAleja', 'PedroPerez', 'JuanMario', 'RoMan', 'Matias']; //Es el array con personas en el sistema.
let usersSaves = Math.round(Math.random()*1000000); // Es el dinero disponible en la cuenta para hacer la transferencia al usuario seleccionado. El numero es random, entero.

/**
 * This function adds a new user to the users array with a simple validation.
 */
function addNewUser(){
  let newUserName = prompt('Por favor ingrese su nombre y su apellido.');
  let newUser = prompt('Por favor ingrese un nombre de usuario.');

  if(newUserName === null || newUser === null || !newUser || !newUserName){
    return;
  } else {
    users.push(newUser);
    alert(`Bienvenido/a ${newUserName}, su nuevo usuario es: ${newUser}.`);
  }
  console.log(users);

  // return newUserName
}

/**
 * This function simulates a login, it's show the user name and the random balance in the acount.
 */
function loginUser(){
  let login = prompt('Por favor ingrese su usuario:');

  if(login === null || !login){
    return;
  }else {
    let search = users.includes(login);

    if(search === false){
      alert(`El usuario ${login} no existe, por favor intente nuevamente.`)
    } else{
      USER_NAME.innerHTML= `Bienvenido/a ${login}.`;
      BALANACE.innerHTML = `${MONEY_FORMAT.format(usersSaves)}`;
    }
  }

  return usersSaves
}

/**
 * This Function Validate if the balance in the user acount is enogh for the transfer
 * @param {*} value 
 * @returns boolean
 */
function validateBalance(value){

  if(value > usersSaves){
    alert(`No posee fondos suficientes para realizar esta transaccion. Su saldo es de: ${MONEY_FORMAT.format(usersSaves)}.`);
    return false
  } 
  return true
}

/**
 * This Function Validates if the user to transfer exist.
 * @param {} value 
 * @returns 
 */
function validateUser(value){
  let search = users.includes(value);

  if(search === false){
    alert(`El usuario ${value} no existe, por favor intente nuevamente.`);
    return false
  } 

  return true

}

/**
 * This function generate a money transfer from an user to another.
 */
function transaction(){
  let moneyToTransfer = prompt('Por favor ingrese el monto a transferir:');
  
  if(moneyToTransfer === null || !moneyToTransfer){
    return
  } 

  if(isNaN(moneyToTransfer)){
    alert(`'${moneyToTransfer}' no son caracteres validos, por favor ingrese el monto a transferir.`);
  } else {
    moneyToTransfer = parseFloat(moneyToTransfer);
    let balanceValidated = validateBalance(moneyToTransfer);

    if(balanceValidated === true){

      let userToTransfer = prompt('Por favor ingrese el usuario al que desee realizar la transferencia.')
      let validatedUser = validateUser(userToTransfer);

      if(validatedUser === true){
        alert(`La transaccion realizada a ${userToTransfer} por ${MONEY_FORMAT.format(moneyToTransfer)}, fue realizada con EXITO.`)

        BALANACE.innerHTML = `${MONEY_FORMAT.format(usersSaves - moneyToTransfer)}`
        TRANSACTIONS.innerHTML = `Transferencia realizada a ${userToTransfer} por ${MONEY_FORMAT.format(moneyToTransfer)}.`

      }
      
    } 

  }

}
  

// Button's events
SIGN_IN.addEventListener('click', addNewUser);
LOG_IN.addEventListener('click', loginUser);
TRANSFER.addEventListener('click', transaction);






