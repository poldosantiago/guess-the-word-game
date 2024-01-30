import { startedControlGame } from './load-word.js'; 

const FIRST_KEY_CODE_LETTER = 65; //código representa a letra 'a'. Não muda com o capslock ativado!
const LAST_KEY_CODE_LETTER = 90; //código representa a letra 'z'.

/**
 * @description reage ao valor inputado no campo.
 * @param {HTMLInputElement} event 
 */
function validateteLetter(event){

    event.preventDefault();
    const inputLetter = event.target;

    const {target:currentInputLetter,key:letterReceived,keyCode:keyCodeLetterReceived} = event;
    
    //se o código da letra digitada estiver no intervalo, entra o if
    if(keyCodeLetterReceived >= FIRST_KEY_CODE_LETTER && keyCodeLetterReceived <=  LAST_KEY_CODE_LETTER){

        //se a letra existe, a preencha em cada campo
        if(currentInputLetter.dataset.inputLetter === letterReceived){
            inputLetter.value = letterReceived;
            
            startedControlGame.addCorrectLetters(); //computando o acerto

            const nextInputLetter = currentInputLetter.nextElementSibling; //identifica o próximo campo
        
            //avança para o próximo somente se ele existir 🤪 
            if(nextInputLetter){
                nextInputLetter.focus();
            }

            //verifica se ganhou
            if(startedControlGame.isGameWin()){
                alert('Você ganhou. Meus Parabéns! 🎉🥳🏅');
                // startedControlGame.createNewGame();
            }
        }
        else{
            //verifica se acabou as tentativas
            if(startedControlGame.isGameOver()){
                alert('acabou o jogo rapaz. Você perdeu 💀');
                // startedControlGame.createNewGame();
            }else{
                //alterando parte das tentativas
                startedControlGame.addOneMoreMistakesLetters(letterReceived);
                startedControlGame.addOneMoreMistakesCount();
                
                //alterando o contador de tentativas
                startedControlGame.updateTriesScoreboard();

                //mudando a cor da bolinha de tentativas
                startedControlGame.updateTriesCircleScoreboard();

            }
        }
    }
}

export default validateteLetter;