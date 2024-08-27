// FASE DI PREPARAZIONE
const numbersBox = document.querySelector('.numbers-box');
const gameTime = document.querySelector('.game-time');
const form = document.querySelector('form');
const messageBoxPar = document.querySelector('.message-box p');
const userNumbers = [];
const correctUserNumbers = [];
// Inizializzo un contatore per il tempo a disposizione
let remainingTime = 5;
// Calcolo 5 numeri casuali (hardcoded)
let cpuNumbers = [15, 8, 85, 44, 33];

// FASE DI ELABORAZIONE
// 1. Visualizzo in pagina 5 numeri casuali (ora hardcoded) e il
// contatore inizializzato
gameTime.innerText = remainingTime;

// 2. Faccio partire un timer di 30 secondi sfruttando la variabile
// già creata per il tempo rimanente
const timer = setInterval(() => {
  // decremento la variabile timer e la stampo in pagina
  gameTime.innerText = --remainingTime;
  // verifico se il tempo è finito e...
  if (!remainingTime) {
    // 3. Stoppo il timer
    clearInterval(timer);
    // 4. Rimuovo i 5 numeri dalla pagina
    numbersBox.classList.add('d-none');
    // 5. Chiedo all'utente con le select predisposte di inserire
    // i 5 numeri visualizzati
    form.classList.remove('d-none');
    messageBoxPar.innerText = 'Inserisci i numeri precedenti in qualsiasi ordine.';
  }
}, 1000)

// 6. Recupero i numeri inseriti dall'utente nel form al click sul bottone
form.addEventListener('submit', e => {
  // impedisco il ricaricamento della pagina
  e.preventDefault();
  
  // con un ciclo for inserisco i numeri nella variabile userNumbers
  for (let i = 1; userNumbers.length < 5; i++) {
    const userNumber = document.querySelector(`.col:nth-child(${i}) input`).value;
    userNumbers.push(userNumber);
  }

  //mostro in console i numeri recuperati
  console.log(userNumbers);
  
  // 7. Controllo con un ciclo sui 5 numeri
  for (let i = 0; i < userNumbers.length; i++) {
    // 8. se uno sia uguale ad uno dei numeri precedenti mostrati
    controlledUserNumber = parseInt(userNumbers[i]);
    if (cpuNumbers.includes(controlledUserNumber)) correctUserNumbers.push(controlledUserNumber);
  }

  // 9. Rimuovo il form e mostro l'esito del controllo in pagina
  form.classList.add('d-none');
  // scrivo il messaggio che viene stampato in pagina in una variabile
  const finalResult = `Hai ricordato ${correctUserNumbers.length} numeri corretti e sono ${correctUserNumbers.join(', ')}.`
  // stampo in pagina
  messageBoxPar.innerText = finalResult;

})

