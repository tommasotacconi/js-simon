// FASE DI PREPARAZIONE
const numbersBox = document.querySelector('.numbers-box');
const gameTime = document.querySelector('.game-time');
const form = document.querySelector('form');
const messageBoxPar = document.querySelector('.message-box p')
// Inizializzo un contatore per il tempo a disposizione
let remainingTime = 5;


// FASE DI ELABORAZIONE
// 1. Visualizzo in pagina 5 numeri casuali (ora hardcoded) e il
// contatore inizializzato
gameTime.innerText = remainingTime;
// 2. Faccio partire un timer di 30 secondi sfruttando la var
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
// 6. Controllo con un ciclo sui 5 numeri
// 7. se sia uguale ad uno dei numeri precedenti mostrati facendo
// girare con un altro ciclo
// 8. Mostro l'esito del controllo in pagina
