import { createNewWord, loadWord, resetGame } from "./assets/js/load-word.js";

const btnRandom = document.querySelector('[data-btn="random"]');
const btnReset = document.querySelector('[data-btn="reset"]');
const form = document.querySelector('.words_form');

form.addEventListener('submit', (event) => event.preventDefault()); //para remover o comportamento padrão do form
window.addEventListener('load', loadWord); //ao carregar a página
btnReset.addEventListener('click', resetGame) //recria o jogo
btnRandom.addEventListener('click', createNewWord) //recria o jogo





