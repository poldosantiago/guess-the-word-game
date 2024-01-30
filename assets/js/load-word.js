import ControlGame from "./ControlGame.js";

const startedControlGame = new ControlGame(); //objeto que controla o jogo. O exporto para ser usado em outra página.

/**
 * @description cria um novo jogo. O método é usado ao carregar a página.
 * @returns {void}
 */
async function loadWord(){    
    await startedControlGame.createNewGame();
}

/**
 * @description reseta o jogo. O método é usado ao acionar o botão reset.
 * @returns {void}
 */
async function resetGame(){    
    await startedControlGame.resetGame();
}

/**
 * @description Gera uma nova palavra no painel do jogo. O método é usado ao acionar o botão random.
 * @returns {void}
 */
async function createNewWord(){    
    await startedControlGame.createNewWord();
}

export { 
    loadWord,
    resetGame,
    createNewWord,
    startedControlGame
};